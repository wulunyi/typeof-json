/**
 * 是否所有字符都是数字字符
 * @param {string} str 字符串
 */
export default function allAreNumChar(str: string) {
  return !/\D/g.test(`${str}`);
}
