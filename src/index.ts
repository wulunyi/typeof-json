import { createSourceFile } from "./compiler/sourcefile";
import * as ts from "typescript";
import teststr from "./teststr";
import { parse } from "./compiler/compiler";

// import emit from './emit';
const { typeChecker, sourceFile, program } = createSourceFile(
  teststr,
  ts.ScriptTarget.Latest,
  ts.ScriptKind.JS
);

parse(sourceFile, typeChecker);

// // console.log(
//   emit(sourceFile, typeChecker)
//   // )
// import getComments from "./utils/get-comments";

// getComments("");
