import * as babylon from 'babylon';
import code from './code';

const ace = require('brace');
require('brace/mode/javascript');
require('brace/ext/beautify');
const beautify = ace.acequire('ace/ext/beautify');
require('./lib/ayu-mirage');

const editor = ace.edit('source-code');
const editor2 = ace.edit('output');
editor.setTheme('ace/theme/ayu-mirage');
editor2.setTheme('ace/theme/ayu-mirage');
editor.session.setMode('ace/mode/javascript');
editor2.session.setMode('ace/mode/javascript');
editor.renderer.setOption('showPrintMargin', false);
editor2.renderer.setOption('showPrintMargin', false);
editor.setValue(code);

const NOTATION_MAP = '->';

const ast = babylon.parse(code, {
  sourceType: 'module'
});

let testCases = `describe("", () => {`;

const createTestCaseCode = testCaseCode => `test("", () => {${testCaseCode}});\n`;

console.log(ast);
ast.program.body.forEach(item => {
  switch (item.type) {
    case 'ExportNamedDeclaration': {
      const declaration = item.declaration;
      const functionName = declaration.declarations[0].id.name;

      if (item.leadingComments) {
        const commentLines = item.leadingComments[0].value.split('\n');
        commentLines.forEach(line => {
          if (line.includes('@test')) {
            const test = line
              .split('@test ')[1]
              .split(NOTATION_MAP)
              .map(item => item.trim());
            const args = test[0];
            const returnValue = test[1];
            testCases += createTestCaseCode(`expect(${functionName}(${args})).toEqual(${returnValue});`);
          }
        });
      }
    }
  }
});

editor2.setValue(testCases + `});`);
beautify.beautify(editor2.session);

