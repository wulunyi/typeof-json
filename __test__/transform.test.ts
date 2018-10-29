import transform from '../src/transform/transform';
import typeToDts from '../src/transform/typeToDts';
import * as ts from 'typescript';
import * as dom from 'dts-dom';
import * as typeofJson from '../src/index';

const result = typeofJson.default(
  `{
  /** aaas */
  "rechargeAmount": 30000, //充值金额
  // test0
  "test": {
    "rate": 30, //折扣比例 例如30
    "limitAmount": 1000, //最高抵扣金额(分)
    "timeLimit": 1477929599 //有效期  传当天23:59:59秒的时间戳
  },
  // test
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
  ],
  "giftAmount": 3000, //满赠金额
}`,
  'rootType',
);

// const nodes = transform(ast);
// const result = nodes
//   .map(typeToDts)
//   .map(dts => dts.emit())
//   .join('\n');
debugger;
