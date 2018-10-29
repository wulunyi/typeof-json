import * as ts from 'typescript';
import * as Dts from '../typings/dts';
import { createDtsFromNode } from './helper';
import getComments from 'src/utils/get-comments';
import { filterNode } from 'src/compiler-utils';

export default function transform(node: ts.Node) {
  const nodes: Dts.Node[] = [];

  const walk = (node: ts.Node, parent?: Dts.Node) => {
    let dtsNode!: Dts.Node;
    let forEachNode: ts.Node = node;

    switch (node.kind) {
      case ts.SyntaxKind.VariableDeclaration:
      case ts.SyntaxKind.PropertyAssignment:
        const initializer = (node as Dts.InitializerParent).initializer;

        dtsNode = createDtsFromNode(node);
        forEachNode = initializer as ts.Node;
        break;
      case ts.SyntaxKind.ObjectLiteralExpression:
      case ts.SyntaxKind.ArrayLiteralExpression:
        dtsNode = createDtsFromNode(node, parent ? parent.name : '');
        break;
      case ts.SyntaxKind.StringLiteral:
      case ts.SyntaxKind.NumericLiteral:
      case ts.SyntaxKind.NullKeyword:
      case ts.SyntaxKind.FalseKeyword:
      case ts.SyntaxKind.TrueKeyword:
      case ts.SyntaxKind.Identifier:
        dtsNode = createDtsFromNode(node);
      default:
        break;
    }

    // 获取注释
    if (dtsNode) {
      const leadingComments: string[] = [];
      const trailingComments: string[] = [];
      const jsDocs: string[] = [];

      if (node.kind === ts.SyntaxKind.PropertyAssignment) {
        jsDocs.push(
          ...((node as ts.PropertyAssignment).jsDoc || [])
            .map(i => i.comment || '')
            .filter(i => !!i),
        );

        const name = (node as ts.PropertyAssignment).name;

        if (name) {
          const { pre, end } = getComments(name.getFullText());
          leadingComments.push(...pre);
          trailingComments.push(...end);
        }
      }

      if (forEachNode.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        const closeBraceToken = filterNode(
          forEachNode,
          ts.SyntaxKind.CloseBraceToken,
        )[0];

        if (closeBraceToken) {
          const { pre, end } = getComments(closeBraceToken.getFullText());
          leadingComments.push(...pre, ...end);
        }
      }

      dtsNode.leadingComments = leadingComments;
      dtsNode.trailingComments = jsDocs.concat(trailingComments);
    }

    if (dtsNode !== undefined) {
      if (parent) {
        parent.children.push(dtsNode);
        dtsNode.parent = parent;
      } else {
        nodes.push(dtsNode);
      }
    }

    if (forEachNode.getChildCount()) {
      ts.forEachChild(forEachNode, (child: ts.Node) => walk(child, dtsNode));
    }
  };

  walk(node);

  return nodes;
}
