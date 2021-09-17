let questionsArray = [];
let questionDiv = document.querySelector('.question');
const getQuestionButton = document.querySelector('#get-question-button');
let questionCount = 0;
function getQuestions() {
  fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => response.json())
    .then((data) => {
      questionsArray = data.results;
      console.log(questionsArray);
    });
}

function displayQuestion() {
  console.log('clicked');
  let q = questionsArray[questionCount];
  let incorrectAnswers = q.incorrect_answers
    .map(
      (ia) =>
        `<input type="checkbox" value=${ia} id=${ia}>
       <label for=${ia}>${ia}</label><br></br>`
    )
    .join(' ');
  console.log(q, incorrectAnswers);
  let questionBody = `
  <h1>${q.question}</h1>
  <form>
    ${incorrectAnswers}
  </form>
  
  `;
  questionDiv.innerHTML = questionBody;
  questionCount += 1;
}

getQuestionButton.addEventListener('click', displayQuestion);
window.onload = getQuestions();
