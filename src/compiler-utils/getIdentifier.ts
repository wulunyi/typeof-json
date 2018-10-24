import * as ts from 'typescript';
import filterNode from './filterNode';

/**
 * Gets identifier 获取节点下第一个 identifier
 * @param node
 * @returns
 */
export default function getIdentifier(node: ts.Node): ts.Node {
  return (
    filterNode(node, ts.SyntaxKind.Identifier)[0] ||
    filterNode(node, ts.SyntaxKind.StringLiteral)[0] ||
    filterNode(node, ts.SyntaxKind.NumericLiteral)[0]
  );
}
