import * as ts from 'typescript';
import * as dom from 'dts-dom';
import { getAllArrItem, isSimpleType, getType } from '../compiler-utils';
import { equalObjectLiteralExpression } from '../equal';
import { safeGenObjDTS } from '.';

export default function genArrDTS(
  node: ts.Node,
  name: string,
): dom.ArrayTypeReference {
  const types = new Set();

  getAllArrItem(node).forEach((itemNode: ts.Node) => {
    const itemType = getType(itemNode);

    if (isSimpleType(itemType)) {
      types.add(itemType);
    } else if (equalObjectLiteralExpression(itemNode)) {
      types.add(safeGenObjDTS(itemNode, name));
    }
  });

  const valueType =
    types.size === 1
      ? [...types][0]
      : dom.create.union([...types] as dom.Type[]);

  return dom.create.array(valueType);
}
