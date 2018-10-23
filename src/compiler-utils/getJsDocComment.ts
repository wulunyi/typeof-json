import * as ts from 'typescript';

/**
 * Gets identifier 获取节点下第一个 identifier
 * @param node
 * @returns
 */
export default function getIdentifier(node: ts.Node): ts.Node {
  return node.getChildren().filter(n => n.kind === ts.SyntaxKind.Identifier)[0];
}
