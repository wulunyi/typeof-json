import { parse } from './utils';
import transform from './transform/transform';
import typeToDts from './transform/typeToDts';

export default function typeofJson(json: string, name?: string) {
  const ast = parse(name ? `const ${name} = ${json}` : json);
  const dtsAst = transform(ast);
  const typeofResult = dtsAst
    .map(typeToDts)
    .map(dtsMap => dtsMap.emit())
    .join('\n');

  return typeofResult;
}
