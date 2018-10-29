import * as ts from 'typescript';

export default function getDeclarations(
  variableStatement: ts.VariableStatement,
) {
  return variableStatement.declarationList.declarations;
}
