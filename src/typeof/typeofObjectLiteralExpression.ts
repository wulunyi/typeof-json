import * as ts from 'typescript';
import * as dom from 'dts-dom';
import { ITypeofResult } from 'src/typings/types';
import { getProperties } from 'src/query';
import { ObjectLiteralExpression } from '../typings/ast';
import { getName, getType, isSimpleType } from 'src/compiler-utils';

export default function typeofObjectLiteralExpression(
  node: ObjectLiteralExpression,
): ITypeofResult {
  const result: ITypeofResult = {
    TtypeList: [],
    PtypeList: [],
    commentList: [],
  };

  getProperties(node).forEach((propNode) => {
    const initializer = propNode.initializer;
    const name = getName(propNode.name);

    if (initializer === undefined) {
      return;
    }

    const valueTypeName = getType(initializer);

    if (isSimpleType(valueTypeName)) {
      result.TtypeList.push(dom.create.alias(name, valueTypeName as dom.Type));
    }

    if (initializer.kind === ts.SyntaxKind.ObjectLiteralExpression) {
      const typeofObj = typeofObjectLiteralExpression(
        initializer as ObjectLiteralExpression,
      );
      const dtsNode = dom.create.interface(name);

      dtsNode.members = typeofObj.PtypeList;

      result.TtypeList.push(...typeofObj.TtypeList.concat(dtsNode));
    }
  });

  return result;
}
