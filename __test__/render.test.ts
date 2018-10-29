import * as ts from 'typescript';
import render from '../src/render/render';
const ast = ts.createSourceFile(
  'test.ts',
  `
// commentLine
/** comment */
const rootTypes = {//方案
  "rechargeAmount": 30000, //充值金额
  "giftAmount": 3000, //满赠金额
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
      }
  ]
}
`,
  ts.ScriptTarget.ESNext,
  true,
);
ts.forEachChild(ast, (child) => {
  console.log(ts.ScriptKind[child.kind]);
});
debugger;
// console.log(
//   render(
//     `
//     // commentLine
//     /** comment */
//     const rootTypes = {//方案
//       "rechargeAmount": 30000, //充值金额
//       "giftAmount": 3000, //满赠金额
//       "kaCouponInfoList": [
//           {
//               "rate": 30, //折扣比例 例如30
//               "limitAmount": 1000, //最高抵扣金额(分)
//               "timeLimit": 1477929599 //有效期  传当天23:59:59秒的时间戳
//           },
//           {
//               "rate": 20, //折扣比例 例如30
//               "limitAmount": 2000, //最高抵扣金额(分)
//               "timeLimit": 1477929599 //有效期  传当天23:59:59秒的时间戳
//           }
//       ]
//   }
// `,
//   ),
// );
