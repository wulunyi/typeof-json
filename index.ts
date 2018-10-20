import * as ts from "typescript";
import * as dom from "dts-dom";
import { tsquery } from "@phenomnomnominal/tsquery";
import getComments from "./src/utils/get-comments";
import {
  getIdentifier,
  getExpression,
  getName,
  filterNode,
  getAllProperty
} from "./src/compiler-utils";
import { createSourceFile } from "./src/compiler/sourcefile";

import teststr from "./src/teststr";
import getType from "./src/utils/get-type";
import isSimpleType from "./src/compiler-utils/isSimpleType";
import { genSimpleDTS } from "./src/gen-dts";
import genObjDTS from "./src/gen-dts/genObjDts";

const { typeChecker, sourceFile, program } = createSourceFile(
  teststr,
  ts.ScriptTarget.Latest,
  ts.ScriptKind.JS
);

const VariableDeclaration = tsquery(sourceFile, "VariableDeclaration");

let InterfaceList: dom.TopLevelDeclaration[] = [];

VariableDeclaration.forEach(node => {
  const identifier = getIdentifier(node);
  const expression = getExpression(node);
  const typeSrt = getType(identifier, typeChecker);

  // 对象时
  if (expression.kind === ts.SyntaxKind.ObjectLiteralExpression) {
    InterfaceList = InterfaceList.concat(
      genObjDTS(expression, typeChecker, getName(identifier))
    );
  } else {
    InterfaceList.push(genSimpleDTS(identifier, typeSrt));
  }
});

InterfaceList.forEach(inter => console.log(dom.emit(inter, { rootFlags: 1 })));
