require.config({ paths: { vs: 'vs' } });
let editor, editorModel;
const initialize = () => {
  const codeElement = document.querySelector('#code');
  editor = monaco.editor.create(codeElement, {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'java',
    theme: 'vs-dark',
    automaticLayout: true,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto'
    },
    minimap: {
      enabled: false
    },
    suggestOnTriggerCharacters: false
  });
  editorModel = editor.getModel();
};
require(['vs/editor/editor.main'], initialize);
