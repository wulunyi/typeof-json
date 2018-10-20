import * as ts from "typescript";
/**
 * Filters node 筛选节点下的子节点
 * @param node 节点
 * @param kind 类型
 * @returns  节点列表
 */
export default function filterNode(node: ts.Node, kind: ts.SyntaxKind) {
  return node.getChildren().filter(n => n.kind === kind);
}
