import { ignoreSimbols } from './const';

function formatGraphQLQuery(queryString: string) {
  const lines = queryString
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter((el) => el !== '')
    .join('\n')
    .split(/({|})/)
    .map((line) => {
      line.trim();
      if (!line.match(ignoreSimbols)) {
        return line
          .split(' ')
          .filter((el) => el !== '')
          .join('\n');
      } else return line;
    });

  let depth = 0;
  const formattedLines = lines.map((line, i, arr) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '{') {
      depth += 2;
      return ' {\n' + ' '.repeat(depth);
    } else if (trimmedLine === '}') {
      depth >= 2 ? (depth -= 2) : (depth = 0);
      return depth === 0 && i !== arr.length - 1
        ? '\n}'
        : '\n' + ' '.repeat(depth) + '}';
    } else if (trimmedLine.includes('\n')) {
      return trimmedLine.replaceAll('\n', `${'\n' + ' '.repeat(depth)}`);
    } else
      return arr[i - 1] === '}' && arr[i + 1] !== '}'
        ? '\n' + ' '.repeat(depth) + trimmedLine
        : trimmedLine;
  });

  return formattedLines.join('').trim();
}

export default formatGraphQLQuery;
