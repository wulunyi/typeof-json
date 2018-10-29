import { ObjectLiteralExpression } from '../typings/ast';

export default function getProperties(node: ObjectLiteralExpression) {
  return node.properties || [];
}
