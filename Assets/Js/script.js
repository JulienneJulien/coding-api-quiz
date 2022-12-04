// GLOBAL VARIABLES WAS DECLARED
var codequestionsEl = document.querySelector("#codequestions");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#options");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector(".intro");
var yourInitials = document.querySelector("#initials");
var quizFeedback = document.querySelector("#quiz-feedback");

var codequestions = [
  {
    title: "Which one is a looping structure in JavaScript?",
    options: ["All the below", "For", "While", "do-while loops"],
    answer: "All the below"
  },
  {
    title: "What are the two basic groups of data types in JavaScript?",
    options: [
      "Primitive and attribute",
      "Primitive and reference types",
      "Reference types and attribute",
      "None of the above"
    ],
    answer: "Primitive and reference types"
  },
  {
    title: "Commonly used data types DO NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "Boolean operators that can be used in JavaScript include:",
    options: [
      "'And' Operator &&",
      "'Or' Operator ||",
      "'Not' Operator !",
      "All the above"
    ],
    answer: "All the above"
  },
  {
    title:
      "Which one of these is not among the three different types of errors in JavaScript?",
      options: [
      "Animation time errors",
      "Load time errors",
      "Run time errors",
      "Logical Errors"
    ],
    answer: "Animation time errors"
  },
  {
    title: "What is the data type of variables in JavaScript?",
    options: [
      "Object data types",
      "Function data type",
      "None of the above",
      "All of the above"
    ],
    answer: "Object data types"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
      options: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  },
  {
    title: "What is the type of Pop up boxes available in JavaScript?:",
    options: ["Alert", "Confirm", "Prompt", "All the above"],
    answer: "All the above"
  }
];

var availableQuestionsList = 0;
var time = 80
codequestions.length * 5;
var timerId;

function beginQuiz() {
// TO HIDE QUIZ START SCREEN//
var introScreen = document.getElementById("begin-screen");
introScreen.setAttribute("class", "hidden-default");
// TO REMOVE QUESTIONNAIRE SECTION HIDDEN REQUEST//
codequestionsEl.removeAttribute("class");

// START TIMER COUNTDOWN//
timerId = setInterval(countdown, 1000);
timerEl.textContent = time;
getCodeQuestion();
}

function getCodeQuestion() {
    var currentCodeQuestion = codequestions[availableQuestionsList];
    
    var titleEl = document.getElementById("questions-title");
    titleEl.textContent = currentCodeQuestion.title;
    
    optionsEl.innerHTML = "";
// TO LOOP THROUGH OPTIONS
currentCodeQuestion.options.forEach(function(option, i) {
    var optionNode = document.createElement("button");
    optionNode.setAttribute("class", "option");
    optionNode.setAttribute("value", option);

    optionNode.textContent = i + 1 + "." + option;
// CLICK EVENT LISTENER ADDED TO EACH OPTION WHEN CLICKED
    optionNode.onclick = codeQuestionsClick;

    optionsEl.appendChild(optionNode);
   });
}
// SET TIMER DEDUCTION IF QUESTION ANSWERED INCORRECTLY 
function codeQuestionsClick() {
    if (this.value !== codequestions[availableQuestionsList].answer) {
        time -= 5;

    if (time < 0) {
        time = 0;
    }    
    timerEl.textContent = time;
    quizFeedback.textContent = "Incorrect!";
    quizFeedback.style.color ="red";
    quizFeedback.style.fontSize = "200%";
    } else {
    quizFeedback.textContent = " You're Correct!";
    quizFeedback.style.color ="green";
    quizFeedback.style.fontSize = "200%"; 
    }
// PROVIDES ANSWER RESPONSE AS GREEN CORRECT OR RED INCORRECT FLASHES
    quizFeedback.setAttribute("class", "quiz-feedback");
    setTimeout(function() {
        quizFeedback.setAttribute("class", "quiz-feedback hidden-default");
    }, 1000);

// CONTINUES TO NEXT QUESTION SCREEN
    availableQuestionsList++;

// TIMER STATUS
    if (availableQuestionsList === codequestions.length) {
       quizEnds(); 
    } else {
      getCodeQuestion();
    }
}
// TIMER STOPPED
function quizEnds() {
    clearInterval(timerId);

    var completedQuizEl = document.getElementById("completed-quiz");
    completedQuizEl.removeAttribute("class");
// FINAL SCORE SCREEN
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
// TO HIDE QUESTIONNAIRE SECTION
    codequestionsEl.setAttribute("class", "hidden-default");
}
// TIMER UPDATE
function countdown() {
    time--;
    timerEl.textContent = time;
// TIMER RUNS OUT
if (time <=0) {
   quizEnds(); 
 }
}
// ENTER INITIALS
function storeHighscores() {
    var initials = yourInitials.value.trim();
// ADD HISTORY OF STORED HIGHSCORES FROM LOCALSTORAGE. IF NONE STORED APPLY TO EMPTY ARRAY
    if (initials !== "") {
        var yourScores =
        JSON.parse(window.localStorage.getItem("yourScores")) || [];

      var userNewScore = {
        score: time,
        initials: initials
      };  

      
// SAVE TO LOCAL STORAGE
        yourScores.push(userNewScore);
        window.localStorage.setItem("yourScores", JSON.stringify(yourScores));

        // NEXT SCREEN (SCORE SCREEN)
        window.location.href="scores.html";  
                // create separate html page for scores and add hyperlink here!!!
    }
}



function checkForEnter(event) {
    if (event.key === "Enter") {
        storeHighscores();
    }
}


// SUBMIT INITIALS
submitButton.onclick = storeHighscores;


//  SUBMIT BUTTON BRINGS YOU BACK TO START INTRO SCREEN OF PAGE 
startButton.onclick = beginQuiz;

yourInitials.onkeyup = checkForEnter;

