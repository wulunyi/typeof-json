import * as ts from "typescript";
import { DefinedNodeType } from "../types/compiler-types";
import { getType } from "../compiler-utils";
import getComments from "../utils/get-comments";

export default function compiler(
  sourceFile: ts.SourceFile,
  typeChecker: ts.TypeChecker
): DefinedNodeType[] {
  return [];
}

const result: DefinedNodeType[] = [];

function createDefinedNode(): DefinedNodeType {
  return {
    name: "",
    kind: 0,
    type: "",
    jsDocComment: [],
    preCommentLine: [],
    endCommentLine: [],
    children: []
  };
}

function parseIdentifier(
  node: ts.Node,
  typeChecker: ts.TypeChecker,
  definedNode: DefinedNodeType
) {
  const { pre, end } = getComments(node.getFullText());

  definedNode.name = node.getText();
  definedNode.type = getType(node);
  definedNode.preCommentLine = pre;
  definedNode.endCommentLine = end;
}

function parseObjectLiteralExpression(
  node: ts.Node,
  typeChecker: ts.TypeChecker,
  definedNode: DefinedNodeType
) {
  ts.forEachChild(node, n => {
    console.log(n.kind);
    if (n.kind === ts.SyntaxKind.SyntaxList) {
      ts.forEachChild(n, c => {
        if (c.kind === ts.SyntaxKind.PropertyAssignment) {
          debugger;
          definedNode.children.push(parsePropertyAssignment(c, typeChecker));
        }
      });
    }
  });
}

function parsePropertyAssignment(
  node: ts.Node,
  typeChecker: ts.TypeChecker
): DefinedNodeType {
  return parseVariableDeclaration(node, typeChecker);
}

function parseVariableDeclaration(node: ts.Node, typeChecker: ts.TypeChecker) {
  const resultNode: DefinedNodeType = createDefinedNode();

  if (node.getChildCount()) {
    ts.forEachChild(node, n => {
      if (n.kind === ts.SyntaxKind.Identifier) {
        parseIdentifier(n, typeChecker, resultNode);
      }

      if (n.kind === ts.SyntaxKind.JSDocComment) {
        resultNode.jsDocComment = [n.getText()];
      }

      if (n.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        parseObjectLiteralExpression(n, typeChecker, resultNode);
      }
    });
  }

  return resultNode;
}

export function parse(node: ts.Node, typeChecker: ts.TypeChecker) {
  switch (node.kind) {
    case ts.SyntaxKind.SourceFile:
    case ts.SyntaxKind.SyntaxList:
    case ts.SyntaxKind.VariableStatement:
    case ts.SyntaxKind.VariableDeclarationList:
    case ts.SyntaxKind.SyntaxList:
    case ts.SyntaxKind.ObjectLiteralExpression:
    case ts.SyntaxKind.PropertyAssignment:
    case ts.SyntaxKind.PropertyAssignment:
    case ts.SyntaxKind.ArrayLiteralExpression:
      node.getChildren().forEach(n => parse(n, typeChecker));
      break;
    case ts.SyntaxKind.VariableDeclaration:
      result.push(parseVariableDeclaration(node, typeChecker));
      break;
    case ts.SyntaxKind.ConstKeyword:
    // result.push("interface");
    // break;
    case ts.SyntaxKind.JSDocComment:
      // result.push(node.getText());
      break;
    case ts.SyntaxKind.Identifier:
      // debugger;
      // parseIdentifier(node);
      // result.push(node.getText());
      // getType(node, typeChecker);
      break;
    case ts.SyntaxKind.NumericLiteral:
      // result.push(node.getText());
      // getType(node, typeChecker);
      break;
    case ts.SyntaxKind.StringLiteral:
      // result.push(node.getText());
      // getType(node, typeChecker);
      break;
    case ts.SyntaxKind.OpenBraceToken:
    // result.push("{");
    // break;
    case ts.SyntaxKind.CloseBraceToken:
    // result.push("}");
    // break;
    case ts.SyntaxKind.CommaToken:
    // result.push(",");
    // break;
    case ts.SyntaxKind.ColonToken:
    // result.push(":");
    // break;
    case ts.SyntaxKind.OpenBracketToken:
    // result.push("[");
    // break;
    case ts.SyntaxKind.CloseBracketToken:
      // result.push("]");
      break;
    case ts.SyntaxKind.EndOfFileToken:
    default:
      break;
  }

  if (result.length === 2) {
    debugger;
  }
}
