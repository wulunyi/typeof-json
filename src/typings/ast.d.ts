import * as ts from 'typescript';

export type ObjectLiteralExpression = ts.ObjectLiteralExpressionBase<
  ts.PropertyAssignment
>;

export type WithInitializerNode =
  | ts.VariableDeclaration
  | ts.PropertyAssignment;

export enum TypeofKind {
  Simple,
  Object,
  Array,
}

export interface TypeofNode {
  kind: TypeofKind;
  name: string;
  typeName: string;
  children?: TypeofNode[];
  parent?: TypeofNode;
  jsDoc?: string[];
}
