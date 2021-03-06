import * as ts from 'typescript';

export default function getAllProperty(node: ts.Node) {
  return node
    .getChildren()
    .filter(n => n.kind === ts.SyntaxKind.SyntaxList)[0]
    .getChildren()
    .filter(n => n.kind === ts.SyntaxKind.PropertyAssignment);
}
