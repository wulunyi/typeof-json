interface CommentLinesType {
  pre: string[];
  end: string[];
}

/**
 * Determines whether start new line is
 * @param str string
 * @returns  boolean
 */
function isStartNewLine(str: string): boolean {
  return /^\s*\n/.test(str);
}

/**
 * Gets all comment line
 * @param str string
 * @returns all comment line
 */
function getAllCommentLine(str: string): string[] {
  const allCommentLineReg = /\/\/[^\n]*\n/g;
  const commentLineReg = /\/\/([^\n]*)\n/;
  const matchAll = str.match(allCommentLineReg);

  if (matchAll === null) {
    return [];
  }

  return matchAll
    .map(i => {
      const match = i.match(commentLineReg);

      if (match === null) {
        return "";
      }

      return match[1].trim();
    })
    .filter(i => !!i);
}

export default function getComments(str: string): CommentLinesType {
  const allLineComments = getAllCommentLine(str);

  if (isStartNewLine(str)) {
    return {
      pre: [],
      end: allLineComments
    };
  }

  return {
    pre: allLineComments.slice(0, 1),
    end: allLineComments.slice(1)
  };
}
