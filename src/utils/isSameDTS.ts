import * as dom from "dts-dom";

function memberToString(node: dom.InterfaceDeclaration) {
  return node.members
    .map(n => (n as dom.PropertyDeclaration).name)
    .sort()
    .join("");
}

export default function isSameDTS(
  node: dom.InterfaceDeclaration,
  cnode: dom.InterfaceDeclaration
) {
  return memberToString(node) === memberToString(cnode);
}
