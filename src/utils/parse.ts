import * as ts from 'typescript';

/**
 * parse source code to ast
 * @param sourceCode sourcecode
 */
export default function parse(sourceCode: string): ts.SourceFile {
  return ts.createSourceFile(
    'json.ts',
    sourceCode,
    ts.ScriptTarget.ESNext,
    true,
  );
}
