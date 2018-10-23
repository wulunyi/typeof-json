import * as ts from 'typescript';

export function equalStringLiteral(node: ts.Node) {
  return node.kind === ts.SyntaxKind.StringLiteral;
}

export function equalObjectLiteralExpression(node: ts.Node) {
  return node.kind === ts.SyntaxKind.ObjectLiteralExpression;
}

export function equalArrayLiteralExpression(node: ts.Node) {
  return node.kind === ts.SyntaxKind.ArrayLiteralExpression;
}

export function equalNumericLiteral(node: ts.Node) {
  return node.kind === ts.SyntaxKind.NumericLiteral;
}
