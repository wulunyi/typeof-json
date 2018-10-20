import * as ts from "typescript";

export default function getName(node: ts.Node): string {
  return node.getText();
}
