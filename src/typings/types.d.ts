import * as dom from 'dts-dom';

export interface ITypeofResult {
  /**
   * interface Declaration list
   */
  TtypeList: dom.TopLevelDeclaration[];
  /**
   * property declaration list
   */
  PtypeList: dom.PropertyDeclaration[];
  commentList: string[];
}
