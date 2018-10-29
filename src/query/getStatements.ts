import * as ts from 'typescript';

function isVariableStatement(node: ts.Node): boolean {
  return node.kind === ts.SyntaxKind.VariableStatement;
}

export default function queryStatements(
  sourceFile: ts.SourceFile,
): ts.VariableStatement[] {
  return sourceFile.statements.filter(
    isVariableStatement,
  ) as ts.VariableStatement[];
}
