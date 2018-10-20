import * as ts from "typescript";

export default function getExpression(node: ts.Node) {
  const children = node.getChildren();

  const index = children.findIndex(
    n =>
      n.kind === ts.SyntaxKind.ColonToken ||
      n.kind === ts.SyntaxKind.EqualsToken
  );

  return children[index + 1] as ts.Node;
}
