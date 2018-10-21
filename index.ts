import * as ts from "typescript";
import * as dom from "dts-dom";
import { tsquery } from "@phenomnomnominal/tsquery";
import { getIdentifier, getExpression, getType } from "./src/compiler-utils";
import genObjDTS from "./src/gen-dts/genObjDts";

import teststr from "./src/teststr";
import { equalObjectLiteralExpression } from "./src/equal";
import * as dtsDB from "./src/dts-db";

const VariableDeclaration = tsquery(
  tsquery.ast(teststr),
  "VariableDeclaration"
);

VariableDeclaration.forEach(node => {
  const nameNode = getIdentifier(node);
  const valueNode = getExpression(node);

  if (equalObjectLiteralExpression(valueNode)) {
    const typeName = nameNode.getText();
    dtsDB.add(typeName, genObjDTS(valueNode, typeName));
  }
});

console.log(dtsDB.emit());
