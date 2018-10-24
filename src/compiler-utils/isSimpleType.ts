const simpleTypes = ['boolean', 'number', 'string', 'null', 'undefined'];

export default function isSimpleType(typeStr: string) {
  return simpleTypes.includes(typeStr);
}
