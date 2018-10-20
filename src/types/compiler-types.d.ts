export interface DefinedNodeType {
  /**
   * interface name or proerty name
   */
  name: string;
  /**
   * Identifier ObjectLiteralExpression ArrayLiteralExpression
   */
  kind: number;
  /**
   * typechecker get type
   */
  type: string;
  jsDocComment: string[];
  preCommentLine: string[];
  endCommentLine: string[];
  children: DefinedNodeType[];
}

export interface CommentLinesType {
  pre: string[];
  end: string[];
}
