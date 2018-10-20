import * as ts from "typescript";
import * as dom from "dts-dom";
import { getName } from "../compiler-utils";

export default function genSimpleDTS(
  node: ts.Node,
  typeStr: string
): dom.TopLevelDeclaration {
  return dom.create.alias(getName(node), typeStr as dom.Type);
}
