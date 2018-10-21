import * as ts from "typescript";
import * as dom from "dts-dom";
import { getAllArrItems, isSimpleType, getType } from "../compiler-utils";
import { equalObjectLiteralExpression } from "../equal";
import genObjDTS from "./genObjDts";
import * as dtsDB from "../dts-db";

export default function genArrDTS(
  node: ts.Node,
  name: string
): dom.ArrayTypeReference {
  const types = new Set();

  getAllArrItems(node).forEach(itemNode => {
    const itemType = getType(itemNode);

    if (isSimpleType(itemType)) {
      types.add(itemType);
    } else if (equalObjectLiteralExpression(itemNode)) {
      dtsDB.add(name, genObjDTS(itemNode, name));
      types.add(name);
    }
  });

  const valueType = dom.create.union([...types] as dom.Type[]);

  return dom.create.array(valueType);
}
