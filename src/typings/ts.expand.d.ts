import * as ts from 'typescript';

declare module 'typescript/lib/typescript' {
  interface VariableStatement {
    jsDoc?: ts.JSDoc[];
  }
  interface ParameterDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface CallSignatureDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface ConstructSignatureDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface MethodSignature {
    jsDoc?: ts.JSDoc[];
  }
  interface PropertySignature {
    jsDoc?: ts.JSDoc[];
  }
  interface ArrowFunction {
    jsDoc?: ts.JSDoc[];
  }
  interface ParenthesizedExpression {
    jsDoc?: ts.JSDoc[];
  }
  interface SpreadAssignment {
    jsDoc?: ts.JSDoc[];
  }
  interface ShorthandPropertyAssignment {
    jsDoc?: ts.JSDoc[];
  }
  interface PropertyAssignment {
    jsDoc?: ts.JSDoc[];
  }
  interface FunctionExpression {
    jsDoc?: ts.JSDoc[];
  }
  interface LabeledStatement {
    jsDoc?: ts.JSDoc[];
  }
  interface ExpressionStatement {
    jsDoc?: ts.JSDoc[];
  }
  interface VariableStatement {
    jsDoc?: ts.JSDoc[];
  }
  interface FunctionDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface ConstructorDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface MethodDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface PropertyDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface InterfaceDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface TypeAliasDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface EnumMember {
    jsDoc?: ts.JSDoc[];
  }
  interface EnumDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface ModuleDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface ImportEqualsDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface IndexSignatureDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface FunctionTypeNode {
    jsDoc?: ts.JSDoc[];
  }
  interface ConstructorTypeNode {
    jsDoc?: ts.JSDoc[];
  }
  interface JSDocFunctionType {
    jsDoc?: ts.JSDoc[];
  }
  interface ExportDeclaration {
    jsDoc?: ts.JSDoc[];
  }
  interface Declaration {
    initializer: ts.Expression;
  }
}
