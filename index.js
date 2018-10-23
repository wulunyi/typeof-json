const {
  render
} = require('./lib');
const teststr = require('./teststr');
console.log(teststr)
console.log(render(teststr, 'rootName'));