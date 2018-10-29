import * as dom from 'dts-dom';

export default class DtsMap {
  private DTS_MAP = new Map();

  public add(name: string, dts: dom.InterfaceDeclaration) {
    this.DTS_MAP.set(name, dts);
  }

  public find(name: string) {
    return this.DTS_MAP.get(name);
  }

  public del(name: string) {
    this.DTS_MAP.delete(name);
  }

  public clear() {
    this.DTS_MAP.clear();
  }

  public emit() {
    return [...this.DTS_MAP]
      .map(dts => dom.emit(dts[1], { rootFlags: 1 }))
      .join('\n');
  }
}
