import * as ts from "typescript";
import * as dom from "dts-dom";
import camelcase from "camelcase";
import {
  getAllProperty,
  getIdentifier,
  getExpression,
  filterNode,
  isSimpleType,
  getName,
  getType
} from "../compiler-utils";
import getComments from "../utils/get-comments";
import {
  equalObjectLiteralExpression,
  equalArrayLiteralExpression
} from "../equal";
import genArrDTS from "./genArrDTS";
import { safeGenObjDTS } from ".";

function getLastChildCommnet(node: ts.Node) {
  const closeBraceTokenNode = filterNode(
    node,
    ts.SyntaxKind.CloseBraceToken
  )[0];

  return getComments(closeBraceTokenNode.getFullText()).pre;
}

export default function genObjDTS(
  node: ts.Node,
  name: string
): dom.InterfaceDeclaration {
  const dts = dom.create.interface(name);

  // 遍历所有属性进行处理
  getAllProperty(node).reduceRight(
    (preComment: string[], curNode: ts.Node, index: number) => {
      const nameNode = getIdentifier(curNode);
      const valueNode = getExpression(curNode);
      const { pre, end } = getComments(nameNode.getFullText());
      let typeName = getType(valueNode);

      const jsDocComment = filterNode(curNode, ts.SyntaxKind.JSDocComment).map(
        // @ts-ignore
        i => i.comment
      );

      // 如果出现在第一个元素的前置注释中表示为整个对象的注释
      if (index === 0 && pre.length > 0) {
        dts.jsDocComment = pre.join("\n");
      }

      // 计算类型名称
      typeName = isSimpleType(typeName)
        ? typeName
        : camelcase(getName(nameNode), { pascalCase: true });

      // 构建属性类型
      const keyDTS = dom.create.property(
        getName(nameNode, false),
        equalArrayLiteralExpression(valueNode)
          ? genArrDTS(valueNode, typeName)
          : (typeName as dom.Type)
      );

      // 如果值是对象表达式则创建一个 interface
      if (equalObjectLiteralExpression(valueNode)) {
        safeGenObjDTS(valueNode, typeName);
      }

      // 添加注释
      const comment = preComment.concat(jsDocComment, end);

      if (comment.length > 0) {
        keyDTS.jsDocComment = comment.join("\n");
      }

      dts.members.unshift(keyDTS);

      return pre;
    },
    getLastChildCommnet(node)
  );

  return dts;
}
