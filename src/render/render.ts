import { tsquery } from '@phenomnomnominal/tsquery';
import * as ts from 'typescript';
import { getIdentifier, getExpression, getName } from '../compiler-utils';
import { equalObjectLiteralExpression } from '../equal';
import * as dtsDB from '../dts-db';
import { safeGenObjDTS } from '../gen-dts';

export default function render(json: string, name: string) {
  const sourceCode = `const ${name} = ${json}`;
  const ast = tsquery.ast(sourceCode);

  tsquery(ast, 'VariableDeclaration').forEach((node: ts.Node) => {
    const nameNode = getIdentifier(node);
    const valueNode = getExpression(node);

    if (equalObjectLiteralExpression(valueNode)) {
      safeGenObjDTS(valueNode, getName(nameNode));
    }
  });

  return dtsDB.emit();
}
