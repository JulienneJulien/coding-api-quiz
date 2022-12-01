var startButton = document.querySelector(".buttons");
var timerEl = document.querySelector("#timer");
var codequestionsEl = document.querySelector("#codequestions");
var optionsEl = document.querySelector("#options");
var submitButton = document.querySelector(".buttons");
var quizFeedback = document.querySelector("quiz-feedback");
var yourInitials = document.querySelector("#initials");

var availableQuestionsList = 0;
var time = codequestions.length *15;
var timerId;

function beingQuiz() {
// TO HIDE QUIZ START SCREEN//
var beginQuizEl = document.getElementsByClassName("class", "intro");
beginQuizEl.setAttribute("class", "hidden-default");
// TO REMOVE QUESTIONNAIRE SECTION HIDDEN REQUEST//
codequestionsEl.removeAttribute("class");
// START TIMER COUNTDOWN//
timerId = setInterval(clockTick,1000);
timerEl.textContent = time;
getQuestion();
}




