import * as Dts from '../typings/dts';
import * as ts from 'typescript';
import * as dom from 'dts-dom';
import { isSimpleType } from 'src/compiler-utils';
import { pascalCase } from 'change-case';
import dtsmap from './dtsmap';

export default function typeToDts(node: Dts.Node) {
  const dtsMap = new dtsmap();

  function typeofObj(node: Dts.Node) {
    const objDts = dom.create.interface(pascalCase(node.name));

    node.children.reduceRight((pre: string[], child) => {
      let typeName: dom.Type = child.typeName as dom.Type;

      if (child.typeName === 'object') {
        typeName = pascalCase(child.name) as dom.Type;

        dtsMap.add(child.name, typeofObj(child));
      } else if (child.typeName === 'array') {
        typeName = typeofArr(child);
      }

      const propertyDts = dom.create.property(child.name, typeName);
      const comments = pre.concat(child.trailingComments);

      if (comments.length > 0) {
        propertyDts.jsDocComment = comments.join('\n');
      }

      objDts.members.unshift(propertyDts);

      return child.leadingComments;
    },                        node.leadingComments);

    return objDts;
  }

  function typeofArr(node: Dts.Node): dom.ArrayTypeReference {
    const types = new Set();

    node.children.forEach((child: Dts.Node) => {
      if (isSimpleType(child.typeName)) {
        types.add(child.typeName);
      } else if (child.typeName === 'object') {
        dtsMap.add(child.name, typeofObj(child));
        types.add(pascalCase(child.name));
      }
    });

    const valueType =
      types.size === 1
        ? [...types][0]
        : dom.create.union([...types] as dom.Type[]);

    return dom.create.array(valueType);
  }

  if (node.typeName === 'object') {
    dtsMap.add(node.name, typeofObj(node));
  }

  return dtsMap;
}
