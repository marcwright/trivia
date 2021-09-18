const getQuestionButton = document.querySelector('#get-question-button');
const answersForm = document.querySelector('#answersForm');
const questionH2 = document.querySelector('#questionH2');
const categoryH4 = document.querySelector('#categoryH4');
const resultDiv = document.querySelector('#result');
const countH1 = document.querySelector('#count');
const category = document.querySelector('#category');
const categoriesMenu = document.querySelector('#categoriesMenu');
const categories = categoryArray;
const chosenCategory = '';
const chosenDifficultly = '';

let questionsArray = [];
let questionCount = 0;
let correct_answer = '';
let numberCorrect = 0;
let numQuestionsPlayed = 0;

function getQuestions() {
  fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => response.json())
    .then((data) => {
      questionsArray = data.results;
      console.log(questionsArray);
    })
    .then((res) => displayQuestion());
}

function sanitizeString(str) {
  return str
    .replaceAll('&ldquo;', '"')
    .replaceAll('&rdquo;', '"')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'")
    .replaceAll('&Uuml;', 'Ü')
    .replaceAll('&lsquo;', "'")
    .replaceAll('&rsquo;', "'");
}

function displayQuestion() {
  answersForm.addEventListener('change', checkAnswer, { once: true });
  resultDiv.textContent = '';
  let currentQuestion = questionsArray[questionCount];
  correct_answer = currentQuestion.correct_answer;
  let allAnswers = [...currentQuestion.incorrect_answers, correct_answer];
  let allAnswersSanitized = allAnswers.map((str) => sanitizeString(str));
  allAnswersSanitized = allAnswersSanitized.sort(() => Math.random() - 0.5);
  // console.log(allAnswers, allAnswersSanitized);

  const answers = allAnswersSanitized
    .map((ia) => {
      if (ia === correct_answer) {
        return `<input type="radio" data-correct="true" name="choice" id=${ia}>
       <label for=${ia}>${ia}</label><br></br>`;
      } else {
        return `<input type="radio" name="choice" id=${ia} >
       <label for=${ia}>${ia}</label><br></br>`;
      }
    })
    .join(' ');

  category.textContent = currentQuestion.category;
  questionH2.textContent = sanitizeString(currentQuestion.question);
  answersForm.innerHTML = answers;
  questionCount += 1;
  countH1.textContent = `Score: ${numberCorrect}/${numQuestionsPlayed}`;
}

function checkAnswer(event) {
  numQuestionsPlayed += 1;
  let correctAnswerLabel = document.querySelector(
    'input[data-correct] + label'
  );
  console.log(event.target);

  if (event.target.dataset.correct) {
    numberCorrect += 1;
    correctAnswerLabel.style.backgroundColor = 'green';
    resultDiv.textContent = 'CORRECT';
  } else {
    correctAnswerLabel.style.backgroundColor = 'green';
    resultDiv.textContent = 'WRONG';
  }

  if (questionCount === questionsArray.length) {
    questionCount = 0;
    setTimeout(getQuestions, 1000);
  } else {
    setTimeout(displayQuestion, 1000);
  }
}

function displayCategories() {
  const categoryOptions = categories.map(
    (cat) => `<option value=${cat.id}>${cat.name}</option>`
  );
  const ui = `
    <select name="categoriesMenu" id="categoriesMenu">
      <option default>Choose a Category</option>
      ${categoryOptions}
    </select>`;
  categoriesMenu.innerHTML = ui;
}

function getSpecificCategory(event) {
  console.log(event.target.value);
}

categoriesMenu.addEventListener('change', getSpecificCategory);
window.onload = function () {
  displayCategories();
  getQuestions();
};
