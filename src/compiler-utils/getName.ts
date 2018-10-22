import * as ts from "typescript";
import camelcase from "camelcase";
import { allAreNumChar, trimQuotes } from "../utils";

export default function getName(
  node: ts.Node,
  isInterfaceName: boolean = true
): string {
  const name = trimQuotes(node.getText());

  return isInterfaceName
    ? allAreNumChar(name)
      ? `_${name}`
      : camelcase(name, { pascalCase: true })
    : name;
}
