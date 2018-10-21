import * as ts from "typescript";
import camelcase from "camelcase";

export default function getName(
  node: ts.Node,
  camelFlag: boolean = true
): string {
  const name = node.getText();
  const reg = /^["|'](.*)["|']$/g;
  let typeName = name.replace(reg, "$1");

  if (!isNaN(+typeName)) {
    typeName = `_${typeName}`;
  }

  return camelFlag ? camelcase(typeName, { pascalCase: true }) : typeName;
}
