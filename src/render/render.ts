import * as ts from 'typescript';
import { getName } from '../compiler-utils';
import { equalObjectLiteralExpression } from '../equal';
import * as dtsDB from '../dts-db';
import { safeGenObjDTS } from '../gen-dts';
import { parse } from '../utils';
import { getStatements, getDeclarations } from '../query';
import { typeofVariableStatement } from '../typeof';

export default function render(json: string, name?: string) {
  const sourceCode = name === undefined ? json : `const ${name} = ${json}`;
  const ast = parse(sourceCode);

  getStatements(ast).forEach((node: ts.VariableStatement) => {
    typeofVariableStatement(node);
    // getDeclarations(node).forEach((nameNode) => {
    //   const valueNode = nameNode.initializer;

    //   if (valueNode && equalObjectLiteralExpression(valueNode)) {
    //     safeGenObjDTS(valueNode, getName(nameNode));
    //   }
    // });
  });

  // return dtsDB.emit();
}
