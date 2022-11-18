const startButton = document.getElementById("startBtn");
const nextButton = document.getElementById("nextBtn");
const questionContainerElement = document.getElementById("questionContainer");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answerButtons");
const gameTimer = document.getElementById("gameTimer");
const mainContainer = document.getElementById("mainContainer");

let shuffledQuestions, currentQuestionIndex;

let score = 0;
let user = "";

const resultsContainer = document.createElement("div");
const nameInput = document.createElement("input");
const saveButton = document.createElement("button");
const highscoresElement = document.createElement("div");
mainContainer.appendChild(resultsContainer);
mainContainer.appendChild(nameInput);
mainContainer.appendChild(saveButton);
mainContainer.appendChild(highscoresElement);

resultsContainer.classList.add("hide")
nameInput.classList.add("hide")
saveButton.classList.add("hide")
highscoresElement.classList.add("hide")

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  console.log(questions.length, currentQuestionIndex);
  if (questions.length === currentQuestionIndex + 1) {
    endGame();
  } else {
    currentQuestionIndex++;
    setNextQuestion();
  }
});

function setTimer(count) {
  const interval = setInterval(() => {
    count--;
    gameTimer.innerText = count;
    if (count === 0) {
      clearInterval(interval);
      startButton.classList.remove("hide")
      questionElement.classList.add("hide")
      answerButtonElement.classList.add("hide")
      // startGame();
    }
  }, 1000);
}

function showOrHideStuff(whatToDo) {
  const elements = [resultsContainer, nameInput, saveButton, highscoresElement];

  if (whatToDo === "hide") {
    elements.forEach((element) => element.classList.add("hide"));
  } else {
    elements.forEach((element) => element.classList.remove("hide"));
  }
}

function startGame() {
  questionElement.classList.remove("hide");
  answerButtonElement.classList.remove("hide");
  showOrHideStuff("hide");

  setTimer(10)
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();

  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e) {
  if (shuffledQuestions.length >= currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  }

  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    // score = score + 1 is the same as
    score++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  // nextButton.classList.remove('hide')
}

function endGame() {
  startButton.classList.remove("hide");
  nextButton.classList.add("hide")
  questionElement.classList.add("hide");
  answerButtonElement.classList.add("hide");

  
  showOrHideStuff("show");
  startButton.innerText = "Restart";

  let highscores = JSON.parse(localStorage.getItem("highscores"));
  // highscores is an array of objects like this : [{user:kevin, score:3}]
  if (!highscores) highscores = [];

  const addAScore = (item) => {
    const scoreChild = document.createElement("p");
    scoreChild.innerText = `${item.user} scored ${item.score}`;
    highscoresElement.appendChild(scoreChild);
  }

  highscores.forEach((item) => {
    addAScore(item)
  });

  saveButton.innerText = "Save";
  saveButton.addEventListener("click", (e) => {
    const newScore = { user, score }
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    addAScore(newScore)
  });

  nameInput.addEventListener("change", (e) => {
    const input = e.target.value;
    user = input;
  });

  resultsContainer.innerText = `You scored ${score} out of ${questions.length}.`;

}

function setStatusClass(element, correct) {
  clearStatusClass(document.body);
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Learning how to code is super fun",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
    ],
  },
  {
    question: "______ Is an example of a Boolean Value",
    answers: [
      { text: "true", correct: true },
      { text: "22", correct: false },
      { text: ".index", correct: false },
      { text: "style.css", correct: false },
    ],
  },
  {
    question: "____ Is the Structure of a Website",
    answers: [
      { text: "css", correct: false },
      { text: "javaScript", correct: false },
      { text: ".html", correct: true },
      { text: "jqueury", correct: false },
    ],
  },
  {
    question: "What is a good tool use to debug?",
    answers: [
      { text: "google", correct: true },
      { text: "w3schools", correct: true },
    ],
  },
];
