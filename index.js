const codeInput = document.querySelector('#code');
const codeSubmitButton = document.querySelector('#code-submit-button');
const codeImage = document.querySelector('#code-image');
const codeInfo = document.querySelector('#code-info');

let currentQuestionIndex = 0;
let codeQuestion = codeQuestions[currentQuestionIndex];

const onKeyPress = e => {
  const code = e.keyCode ? e.keyCode : e.which;
  /* Key Enter */
  if (code == 13) {
    e.preventDefault();
    codeSubmitButton.click();
  }
};
codeInput.addEventListener('keypress', onKeyPress);
let currentCodeSubmit = () => 'noop';

const nextCodeQuestions = () => {
  codeQuestion = codeQuestions[++currentQuestionIndex];
  if (!codeQuestion) return;
  const hasNext = currentQuestionIndex <= codeQuestions.length - 1;

  codeInfo.innerHTML = hasNext
    ? 'You have another set of questions to answer'
    : 'You have finished all the questions';

  if (!codeQuestion) return;
  createCodeQuiz(codeQuestion.codes);
  codeInput.value = '';
  codeInput.focus();
};

const createCodeQuiz = codes => {
  codeSubmitButton.removeEventListener('click', currentCodeSubmit);

  let currentCodeIndex = 0;
  let currentCode = codes[currentCodeIndex];
  codeImage.src = `images/${currentCode.image}`;
  currentCode.answers = currentCode.answers.map(c => c.replace(/\s/gm, ''));
  const checkCode = code => {
    console.log(editorModel.getValue());
    return code.includes(editorModel.getValue().replace(/\s/gm, ''));
  };

  const nextCode = () => {
    currentCode = codes[++currentCodeIndex];
    currentCode.answers = currentCode.answers.map(c => c.replace(/\s/gm, ''));
    codeImage.src = `images/${currentCode.image}`;
    codeInput.value = '';
    codeInput.focus();
  };

  const validateCode = () => {
    if (currentCodeIndex === codes.length - 1) {
      codeInfo.innerHTML = 'You have finished the quiz';
      return nextCodeQuestions();
    }
    const isValid = checkCode(currentCode.answers);
    if (!isValid) return (codeInfo.innerHTML = `Code is not valid`);
    codeInfo.innerHTML = 'Code is valid';
    nextCode();
  };

  currentCodeSubmit = validateCode;
  codeSubmitButton.addEventListener('click', currentCodeSubmit);
};

window.addEventListener('load', () => {
  createCodeQuiz(codeQuestion.codes);
});
