import * as ts from 'typescript';
import * as changeCase from 'change-case';

import { allAreNumChar, trimQuotes } from '../utils';

export default function getName(
  node: ts.Node,
  isInterfaceName: boolean = true,
): string {
  const name = trimQuotes(node.getText());

  return isInterfaceName
    ? allAreNumChar(name)
      ? `_${name}`
      : changeCase.pascalCase(name)
    : name;
}
