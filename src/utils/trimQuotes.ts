/**
 * 去除前后双引号
 * @param str
 */
export default function trimQuotes(str: string): string {
  return str.replace(/^["|'](.*)["|']$/g, '$1');
}
