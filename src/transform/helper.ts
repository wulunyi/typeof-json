import * as Dts from '../typings/dts';
import * as ts from 'typescript';
import { getName, getType } from 'src/compiler-utils';

export function createDtsNode(
  partialNode: Dts.Partial<Dts.Node> = {},
): Dts.Node {
  return Object.assign(
    {
      kind: ts.SyntaxKind.AnyKeyword,
      name: '',
      typeName: '',
      children: [],
      leadingComments: [],
      trailingComments: [],
    },
    partialNode,
  );
}

const complexNodes = [
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.PropertyAssignment,
];

export function createDtsFromNode(node: ts.Node, name: string = ''): Dts.Node {
  if (complexNodes.includes(node.kind)) {
    const initializer = (node as Dts.InitializerParent).initializer;
    const name = getName((node as Dts.InitializerParent).name, false);
    const typeName = getType(initializer as ts.Node);

    return createDtsNode({
      typeName,
      name,
      kind: (initializer as ts.Node).kind,
    });
  }

  return createDtsNode({
    name,
    kind: node.kind,
    typeName: getType(node),
  });
}
