import * as ts from 'typescript';
import { getName, getType } from '../src/compiler-utils';
const ast = ts.createSourceFile(
  'test.ts',
  `
  const bbb = '';
  const ccc = [[1]];
  // commentLine
  /** comment */
  const rootTypes = {//方案
    "rechargeAmount": 30000, //充值金额
    "giftAmount": 3000, //满赠金额
    "test": {
      "rate": 30, //折扣比例 例如30
      "limitAmount": 1000, //最高抵扣金额(分)
      "timeLimit": 1477929599 //有效期  传当天23:59:59秒的时间戳
    },
    "kaCouponInfoList": [
        {
            "rate": 30, //折扣比例 例如30
            "limitAmount": 1000, //最高抵扣金额(分)
            "timeLimit": 1477929599 //有效期  传当天23:59:59秒的时间戳
        },
        {
            "rate": 20, //折扣比例 例如30
            "limitAmount": 2000, //最高抵扣金额(分)
            "timeLimit": 1477929599 //有效期  传当天23:59:59秒的时间戳
        },
        'aaa',
        123,
        null,
        undefined,
        true,
        false
    ]
  }
  `,
  ts.ScriptTarget.ESNext,
  true,
);

// // 1 普通
// // 2 对象
// // 3 数组
// interface AstNode {
//   kind: ts.SyntaxKind;
//   name: string;
//   typeName: string;
//   children: AstNode[];
//   parent?: AstNode;
// }

// const nodes: AstNode[] = [];

// function walk(node: ts.Node, parent?: AstNode) {
//   let pp!: AstNode;
//   let nextNode: ts.Node = node;

//   switch (node.kind) {
//     case ts.SyntaxKind.VariableDeclaration:
//     case ts.SyntaxKind.PropertyAssignment:
//       const initializer = (node as ts.VariableDeclaration).initializer;
//       const name = getName((node as ts.VariableDeclaration).name);
//       const typeName = getType(initializer as ts.Node);

//       pp = {
//         typeName,
//         name,
//         kind: node.kind,
//         children: [],
//       };

//       if (parent) {
//         parent.children.push(pp);
//         pp.parent = parent;
//       } else {
//         nodes.push(pp);
//       }

//       nextNode = initializer as ts.Node;
//       break;
//     case ts.SyntaxKind.ObjectLiteralExpression:
//       pp = {
//         name: '',
//         typeName: 'object',
//         kind: node.kind,
//         children: [],
//       };

//       if (parent) {
//         pp.name = parent.name;

//         parent.children.push(pp);
//       } else {
//         nodes.push(pp);
//       }
//       break;
//     case ts.SyntaxKind.StringLiteral:
//     case ts.SyntaxKind.NumericLiteral:
//     case ts.SyntaxKind.NullKeyword:
//     case ts.SyntaxKind.FalseKeyword:
//     case ts.SyntaxKind.TrueKeyword:
//     case ts.SyntaxKind.Identifier:
//       pp = {
//         name: '',
//         typeName: getType(node),
//         kind: node.kind,
//         children: [],
//       };

//       if (parent) {
//         parent.children.push(pp);
//       } else {
//         nodes.push(pp);
//       }
//     default:
//       break;
//   }

//   if (nextNode.getChildCount()) {
//     ts.forEachChild(nextNode, (child: ts.Node) => walk(child, pp));
//   }
// }

// walk(ast);
// debugger;
// console.log(nodes);
