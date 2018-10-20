import * as ts from "typescript";

const result = [];
const typeCache = {};

// const type = typeChecker.getTypeAtLocation(node)
// const symbol = typeChecker.getSymbolAtLocation(node)

function getType(node: ts.Node, typeChecker: ts.TypeChecker) {
  const type = typeChecker.getTypeAtLocation(node);
  const symbol = typeChecker.getSymbolAtLocation(node);
  console.log(node.getText(), ":", typeChecker.typeToString(type, node));
}

export function createDtsTree(node: ts.Node, typeChecker: ts.TypeChecker) {
  switch (node.kind) {
    case ts.SyntaxKind.SourceFile:
    case ts.SyntaxKind.SyntaxList:
    case ts.SyntaxKind.VariableStatement:
    case ts.SyntaxKind.VariableDeclarationList:
    case ts.SyntaxKind.SyntaxList:
    case ts.SyntaxKind.VariableDeclaration:
    case ts.SyntaxKind.ObjectLiteralExpression:
    case ts.SyntaxKind.PropertyAssignment:
    case ts.SyntaxKind.PropertyAssignment:
    case ts.SyntaxKind.ArrayLiteralExpression:
      node.getChildren().forEach(n => createDtsTree(n, typeChecker));
      break;
    case ts.SyntaxKind.ConstKeyword:
      result.push("interface");
      break;
    case ts.SyntaxKind.JSDocComment:
      result.push(node.getText());
      break;
    case ts.SyntaxKind.Identifier:
      result.push(node.getText());
      getType(node, typeChecker);
      break;
    case ts.SyntaxKind.NumericLiteral:
      result.push(node.getText());
      getType(node, typeChecker);
      break;
    case ts.SyntaxKind.StringLiteral:
      result.push(node.getText());
      getType(node, typeChecker);
      break;
    case ts.SyntaxKind.OpenBraceToken:
      result.push("{");
      break;
    case ts.SyntaxKind.CloseBraceToken:
      result.push("}");
      break;
    case ts.SyntaxKind.CommaToken:
      result.push(",");
      break;
    case ts.SyntaxKind.ColonToken:
      result.push(":");
      break;
    case ts.SyntaxKind.OpenBracketToken:
      result.push("[");
      break;
    case ts.SyntaxKind.CloseBracketToken:
      result.push("]");
      break;
    case ts.SyntaxKind.EndOfFileToken:
    default:
      break;
  }
}

export default function(node: ts.Node, typeChecker: ts.TypeChecker) {
  createDtsTree(node, typeChecker);

  return result;
}
