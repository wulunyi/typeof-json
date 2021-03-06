import * as dtsDB from '../dts-db';
import * as ts from 'typescript';
import genObjDts from './genObjDts';
import isSameDTS from '../utils/isSameDTS';

export default function safeGenObjDTS(node: ts.Node, name: string) {
  const typeName = dtsDB.find(name) ? `${name}_1` : name;
  const typeDom = genObjDts(node, typeName);

  if (typeName === name || !isSameDTS(dtsDB.find(name), typeDom)) {
    dtsDB.add(typeName, typeDom);

    return typeName;
  }

  return name;
}
