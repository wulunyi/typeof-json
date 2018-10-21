import * as ts from "typescript";

export default function getType(node: ts.Node): string {
  let result!: string;

  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral:
      result = "string";
      break;
    case ts.SyntaxKind.NumericLiteral:
      result = "number";
      break;
    case ts.SyntaxKind.NullKeyword:
      result = "null";
      break;
    case ts.SyntaxKind.Identifier:
      result = node.getText() === "undefined" ? "undefined" : "any";
      break;
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
      result = "boolean";
      break;
    case ts.SyntaxKind.ArrayLiteralExpression:
    case ts.SyntaxKind.ObjectLiteralExpression:
      result = "object";
      break;
    default:
      result = "any";
      break;
  }

  return result;
}
