var quizBody = document.getElementById("quiz");
var resultsElement = document.getElementById("result");
var finalScoreElement = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsElement = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: "javascript",
    choiceB: "js",
    choiceC: "script",
    choiceD: "scripting",
    correctAnswer: "c",
  },
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a",
  },
  {
    question: "What is the correct JavaScript syntax to write Hello World?",
    choiceA: "response.write(Hello World",
    choiceB: "document.write(Hello World)",
    choiceC: "Hello World",
    choiceD: "(Hello World)",
    correctAnswer: "b",
  },
  {
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d",
  },
  {
    question: "How do you write Hello World in an alert box?,
    choiceA: "alert(HelloWorld)",
    choiceB: "msgBox(Hello World)",
    choiceC: "Hello World",
    choiceD: "helloworld.alert",
    correctAnswer: "a",
  },
  {
    question: "How do you create a function?",
    choiceA: "function()",
    choiceB: "function=myFunction()",
    choiceC: "function myFunction()",
    choiceD: "function myfunction()",
    correctAnswer: "c",
  },
  {
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b",
  },
];
// more global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
  gameoverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}
//end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
  quizBody.style.display = "none";
  gameoverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreElement.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

//clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

//displays the high scores page while hiding all of the other pages from
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 76;
  score = 0;
  currentQuestionIndex = 0;
}

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("That Is Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("That Is Incorrect.");
    currentQuestionIndex++;
    generateQuizQuestion();
    //display in the results div that the answer is wrong.
  } else {
    showScore();
  }
}

// This button starts the quiz!
startQuizButton.addEventListener("click", startQuiz);
