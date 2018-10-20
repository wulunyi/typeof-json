import * as ts from "typescript";

export function createSourceFile(
  code: string,
  scriptTarget: ts.ScriptTarget,
  scriptKind: ts.ScriptKind
) {
  const filePath = `/ts-ast-viewer.ts`;
  const sourceFile = ts.createSourceFile(
    filePath,
    code,
    scriptTarget,
    false,
    scriptKind
  );
  const options: ts.CompilerOptions = {
    strict: true,
    target: scriptTarget,
    allowJs: true,
    module: ts.ModuleKind.ES2015
  };
  const files: { [name: string]: ts.SourceFile | undefined } = {
    [filePath]: sourceFile
  };

  const compilerHost: ts.CompilerHost = {
    getSourceFile: (
      fileName: string,
      languageVersion: ts.ScriptTarget,
      onError?: (message: string) => void
    ) => {
      return files[fileName];
    },
    // getSourceFileByPath: (...) => {}, // not providing these will force it to use the file name as the file path
    // getDefaultLibLocation: (...) => {},
    getDefaultLibFileName: (defaultLibOptions: ts.CompilerOptions) =>
      "/" + ts.getDefaultLibFileName(defaultLibOptions),
    writeFile: () => {
      // do nothing
    },
    getCurrentDirectory: () => "/",
    getDirectories: (path: string) => [],
    fileExists: (fileName: string) => files[fileName] != null,
    readFile: (fileName: string) =>
      files[fileName] != null ? files[fileName]!.getFullText() : undefined,
    getCanonicalFileName: (fileName: string) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    getEnvironmentVariable: () => ""
  };
  const program = ts.createProgram(
    [...Object.keys(files)],
    options,
    compilerHost
  );
  const typeChecker = program.getTypeChecker();

  return { program, typeChecker, sourceFile };
}
