import * as ts from "typescript";

export default function getType(node: ts.Node, typeChecker: ts.TypeChecker) {
  const type = typeChecker.getTypeAtLocation(node);
  // const symbol = typeChecker.getSymbolAtLocation(node);

  return typeChecker.typeToString(type, node);
}
