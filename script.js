const getQuestionButton = document.querySelector('#get-question-button');
const answersForm = document.querySelector('#answersForm');
const questionH1 = document.querySelector('#questionH1');
const categoryH4 = document.querySelector('#categoryH4');
const resultDiv = document.querySelector('#result');

let questionsArray = [];
let questionCount = 0;
let correct_answer = '';

function getQuestions() {
  fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => response.json())
    .then((data) => {
      questionsArray = data.results;
      console.log(questionsArray);
    });
}

function sanitizeString(str) {
  return str
    .replaceAll('&ldquo;', '"')
    .replaceAll('&rdquo;', '"')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&Uuml;', 'Ü');
}

function displayQuestion() {
  resultDiv.textContent = '';
  let currentQuestion = questionsArray[questionCount];
  correct_answer = currentQuestion.correct_answer;
  let allAnswers = [...currentQuestion.incorrect_answers, correct_answer];
  let allAnswersSanitized = allAnswers.map((str) => sanitizeString(str));
  allAnswersSanitized = allAnswersSanitized.sort(() => Math.random() - 0.5);
  console.log(allAnswers, allAnswersSanitized);

  const answers = allAnswersSanitized
    .map((ia) => {
      if (ia === correct_answer) {
        return `<input type="checkbox" data-correct="true" id=${ia}>
       <label for=${ia}>${ia}</label><br></br>`;
      } else {
        return `<input type="checkbox" id=${ia}>
       <label for=${ia}>${ia}</label><br></br>`;
      }
    })
    .join(' ');

  questionH1.textContent = sanitizeString(currentQuestion.question);
  answersForm.innerHTML = answers;
  questionCount += 1;
}

function blinkCorrectAnswer() {}

function checkAnswer(event) {
  console.log(event.target.dataset.correct);
  console.log('check answer');
  let correctAnswerInput = document.querySelector('input[data-correct]');
  console.log(correctAnswerInput);

  if (event.target.dataset.correct) {
    console.log('correct');
    resultDiv.textContent = 'Correct';
  } else {
    console.log('nope');
    resultDiv.textContent = 'WRONG';
  }
}

answersForm.addEventListener('change', checkAnswer);
getQuestionButton.addEventListener('click', displayQuestion);
window.onload = getQuestions();
