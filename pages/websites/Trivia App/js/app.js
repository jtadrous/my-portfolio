/* Broken at the moment bc can't read google spreadsheet 
read more here: https://cloud.google.com/blog/products/g-suite/migrate-your-apps-use-latest-sheets-api */

/**
 * Control interaction and maintain important variables.
 * @param {Object[]} data - The imported data from spreadsheet using tabletop.
 */
var counter = 0;

function main(questionBank) {
  //create main variables and start displaying game.
  var correctaudio = new Audio("Correct Bell.wav");
  var wrongaudio = new Audio("Incorrect Buzzer.mp3");
  var currentQuestion = "";
  var currentCategory = "";
  var questionNum = 0;
  var timer = true;

  //listen for click events on answer buttons - then record answer, make updates to questionbank, and display feedback
  $(".answer-button").on("click", (e) => {
    var answerId = e.target.id; //id of clicked button describes answer
    questionBank = getUpdatedBank(questionBank, currentQuestion.id, answerId);
    if (answerId == "correctAnswer") {
      $("#correctAnswer").append("<i> &#x2713;</i>"); // append a check mark
      document.getElementById("score").innerHTML = "Score: " + ++counter * 10;
      correctaudio.play();
    } else {
      $("#correctAnswer").append("<i> &#x2713;</i>"); // append a check mark
      $("#" + answerId).append("<i> &#x2717;</i>"); // append an 'x' for wrong answers
      wrongaudio.play();
    }

    $(".answer-button").attr("disabled", true); // disable answer buttons now
    $(".next-button").show(); //allow user to advance to next question
  });

  //listen for click events on next question button - then display next question or, if finished, go to category screen
  $(".next-button").on("click", (e) => {
    document.getElementById("category-screen").style.display = "none";
    var remainingCategoryQuestions = getUnansweredQuestions(
      questionBank,
      currentQuestion.category
    );
    document.getElementById("number").innerHTML = ++questionNum + "/10";
    if (remainingCategoryQuestions.length > 0) {
      currentQuestion = remainingCategoryQuestions[0]; //mod
      displayQuestion(currentQuestion);
    } else {
      $("#question-screen").hide();
      $("#result-screen").show();
    }
  });
}

//This reloads the whole page
function playAgain() {
  location.reload();
}

//This displays the category screen and hides the previous title screen
function getCategoryScreen() {
  document.getElementById("category-screen").style.display = "block";
  document.getElementById("title-screen").style.display = "none";
}

//This sets the 2 minute timer running in the background
function setTimer() {
  var myVar = setTimeout(Time, 120000);
  timer = false;
  myStopFunction();
}

//This stops the timer
function myStopFunction() {
  if ((timer === Time, 0)) {
    clearTimeout(myVar);
  }
}

//This alerts that Time's Up and goes immediately to the result screen
function Time() {
  alert("Times Up!");
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("question-screen").style.display = "none";
}

//This displays the score on the question screen
function displayNum() {
  document.getElementById("result").innerHTML = "Score: " + counter * 10;
}

document.getElementById("timer").innerHTML = 02 + ":" + 0;

//This creates the timer that is displayed on the question screen
function startTimer() {
  var presentTime = document.getElementById("timer").innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }

  document.getElementById("timer").innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
}

//This updates the timer that is displayed on the question screen
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

/**
 * Display a question.
 * @param {Object} question - The question object to display.
 */
function displayQuestion(question) {
  //$("#question-screen").hide();
  document.getElementById("question-screen").style.display = "block";
  $("#category").html(question.category);
  $("#question").html(question.question);
  $("#correctAnswer").html(question.correctAnswer);
  $("#incorrectAnswer1").html(question.incorrectAnswer1);
  $("#incorrectAnswer2").html(question.incorrectAnswer2);
  $("#incorrectAnswer3").html(question.incorrectAnswer3);
  var shuffledAnswers = getShuffledArray($(".answer-set").children()); //don't want the correct answer always at top!
  $(".answer-set").append(shuffledAnswers);
  $(".answer-button").attr("disabled", false); //ensure answer buttons are enabled
  $(".next-button").hide(); //hide next button until an answer is selected
}

/**
 * Record user answer in a question bank and return the updated bank.
 * @param {Object[]} qBank - The question bank to be updated.
 * @param {string} questionId - The id of the question to be updated.
 * @param {string} answerId - The html element id of the clicked answer.
 * @returns {Object[]}
 */
function getUpdatedBank(qBank, questionId, answerId) {
  return qBank.map((question) => {
    if (question.id == questionId) question.answer = answerId;
    return question;
  });
}

/**
 * Get the unanswered questions from a question bank.
 * @param {Object[]} qBank - The full question bank.
 * @returns {Object[]}
 */
function getUnansweredQuestions(qBank, category) {
  return qBank.filter((question) => {
    if (category)
      return !("answer" in question) && question.category === category;
    else return !("answer" in question);
  });
}

/**
 * Get the categories from a question bank.
 * @param {Object[]} qBank - The full question bank.
 * @returns {Object[]}
 */
function getCategories(qBank) {
  return [...new Set(qBank.map((question) => question.category))];
}

/**
 * Get a shuffled version of an array.
 * @param {*[]} qBank - The existing question bank to be updated.
 * @param {string} questionId - The id of the answered question to be updated.
 * @param {string} answerId - The html element id of user's clicked answer.
 * @returns {*[]}
 */
function getShuffledArray(array) {
  return array.sort((a, b) => {
    return 0.5 - Math.random();
  });
}

/**
 * Get questions from published Google Sheet (using key) then start main() function with shuffled question bank.
 */
function setup() {
  Tabletop.init({
    key: "https://docs.google.com/spreadsheets/d/1EZyNRR82MzY2MvnYOfv6DVIpYtyiB3jjVJXwCCuzwRE/edit",
    callback: (data) => {
      var questionBank = getShuffledArray(data["Sheet1"].elements); //shuffle question order
      main(questionBank);
    },
  });
}

window.onload = setup; //starts app once content is loaded.
