import * as dtsDB from "../dts-db";
import * as ts from "typescript";
import genObjDTS from "./genObjDts";
import isSameDTS from "../utils/isSameDTS";

export default function safeGenObjDTS(node: ts.Node, name: string) {
  const typeName = dtsDB.find(name) ? name + "_1" : name;
  const typeDom = genObjDTS(node, typeName);

  if (typeName === name || !isSameDTS(dtsDB.find(name), typeDom)) {
    dtsDB.add(typeName, typeDom);

    return typeName;
  }

  return name;
}
