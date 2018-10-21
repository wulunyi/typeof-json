import * as dom from "dts-dom";

const DTS_MAP = new Map();

export function add(name: string, dts: dom.InterfaceDeclaration) {
  DTS_MAP.set(name, dts);
}

export function find(name: string) {
  return DTS_MAP.get(name);
}

export function del(name: string) {
  DTS_MAP.delete(name);
}

export function clear() {
  DTS_MAP.clear();
}

export function emit() {
  return [...DTS_MAP].map(dts => dom.emit(dts[1], { rootFlags: 1 })).join("\n");
}
