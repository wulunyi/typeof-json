import * as ts from 'typescript';

/**
 * Gets jsdoc
 * @param node
 * @returns jsdoc[]
 */
export default function getJSDoc(node: ts.VariableStatement): string[] {
  return (node.jsDoc || [])
    .map((docNode: ts.JSDoc) => docNode.comment || '')
    .filter((doc: string) => !!doc);
}
