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
    .replaceAll('&#039;', "'");
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
    .map(
      (ia) =>
        `<input type="checkbox" value=${ia} id=${ia}>
       <label for=${ia}>${ia}</label><br></br>`
    )
    .join(' ');

  questionH1.textContent = sanitizeString(currentQuestion.question);
  answersForm.innerHTML = answers;
  questionCount += 1;
}

function checkAnswer(event) {
  console.log(event.target.value);
  console.log('check answer');

  // let correctAnswerInput = document.querySelector(
  //   `input[value=${correct_answer}]`
  // );
  console.log(correct_answer);
  if (event.target.value === correct_answer) {
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
