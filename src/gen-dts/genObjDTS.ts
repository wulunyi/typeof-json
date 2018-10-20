import * as ts from "typescript";
import * as dom from "dts-dom";
import camelcase from "camelcase";
import {
  getAllProperty,
  getIdentifier,
  getExpression,
  filterNode,
  isSimpleType,
  getName
} from "../compiler-utils";
import getComments from "../utils/get-comments";
import getType from "../utils/get-type";
import { equalObjectLiteralExpression } from "../equal";

export default function genObjDTS(
  node: ts.Node,
  typeChecker: ts.TypeChecker,
  name: string
): dom.TopLevelDeclaration[] {
  const result: dom.TopLevelDeclaration[] = [];
  const dts = dom.create.interface(name);

  result.push(dts);

  const allPropertyNode = getAllProperty(node);

  // 遍历所有属性进行处理
  allPropertyNode.reduceRight(
    (preComment: string[], curNode: ts.Node, index: number) => {
      const identifierNode = getIdentifier(curNode);
      const expressionNode = getExpression(curNode);
      const { pre, end } = getComments(identifierNode.getFullText());
      const identifierType = getType(identifierNode, typeChecker);
      const jsDocComment = filterNode(curNode, ts.SyntaxKind.JSDocComment).map(
        // @ts-ignore
        i => i.comment
      );

      // 如果出现在第一个元素的前置注释中表示为整个对象的注释
      if (index === 0 && pre.length > 0) {
        dts.jsDocComment = pre.join("\n");
      }

      const typeStr = isSimpleType(identifierType)
        ? identifierType
        : camelcase(getName(identifierNode), { pascalCase: true });

      // 构建属性类型
      const keyDTS = dom.create.property(
        getName(identifierNode),
        typeStr as dom.Type
      );

      if (isSimpleType(identifierType)) {
      }

      if (equalObjectLiteralExpression(expressionNode)) {
      }

      // 添加注释
      const comment = preComment.concat(jsDocComment, end);

      if (comment.length > 0) {
        keyDTS.jsDocComment = comment.join("\n");
      }

      dts.members.unshift(keyDTS);

      return pre;
    },
    []
  );

  return result;
}
