import * as ts from 'typescript';
import * as dom from 'dts-dom';
import { ITypeofResult } from '../typings/types';
import { getDeclarations } from '../query';
import { getJSDoc } from '../utils';
import getComments from '../utils/get-comments';
import { getName, getType, isSimpleType } from '../compiler-utils';
import { typeofObjectLiteralExpression } from './index';
import { ObjectLiteralExpression } from '../typings/ast';

export default function typeofVariableStatement(
  node: ts.VariableStatement,
): ITypeofResult {
  const result: ITypeofResult = {
    TtypeList: [],
    PtypeList: [],
    commentList: [],
  };
  // 补充下行级注释（ps：解析注释规则）
  const jsDoc = getJSDoc(node);

  getDeclarations(node).forEach((declarationNode) => {
    const initializer = declarationNode.initializer;
    const name = getName(declarationNode.name);

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

      // add jsDoc comment
      if (jsDoc.length > 0 || typeofObj.commentList.length > 0) {
        dtsNode.jsDocComment = jsDoc.concat(typeofObj.commentList).join('\n');
      }

      result.TtypeList.push(...typeofObj.TtypeList.concat(dtsNode));
    }
  });

  console.log(dom.emit(result.TtypeList[0]));
  return result;
}
