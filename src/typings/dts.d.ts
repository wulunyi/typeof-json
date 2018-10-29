import * as ts from 'typescript';

export type Partial<T> = { [P in keyof T]?: T[P] };

export type InitializerParent = ts.VariableDeclaration | ts.PropertyAssignment;

export interface Node {
  kind: ts.SyntaxKind;
  name: string;
  typeName: string;
  parent?: Node;
  children: Node[];
  leadingComments: string[];
  trailingComments: string[];
}
