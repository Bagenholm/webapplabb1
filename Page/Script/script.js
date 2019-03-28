//TODO: Result table
//TODO: Settings page

var basicApiAdress = 'https://opentdb.com/api.php?amount=10&type=multiple';
var questionArray;
var nextQuestionIndex = 0;
var alternatives;
var points = 0;
var questionsAsked = 0;

getQuestions();

function checkSettings() {
    let category = document.getElementById("category");
    let difficulty = document.getElementById("difficulty");
    return basicApiAdress + '&category=' + category.value + '&difficulty=' + difficulty.value;
}

function getQuestions() {
    var url = checkSettings();
    console.log(url);
    fetch(url).then(function(response) {
        return response.json();
    }).then(function (myJson) {
        questionArray = JSON.parse(JSON.stringify(myJson));
        newQuestion();
    });
}

function newQuestion() {
    alternatives = makeAlternativeArray().sort();
    document.getElementById("question").innerHTML = questionArray.results[nextQuestionIndex].question;
    document.getElementById("alt1").innerHTML = alternatives[0];
    document.getElementById("alt2").innerHTML = alternatives[1];
    document.getElementById("alt3").innerHTML = alternatives[2];
    document.getElementById("alt4").innerHTML = alternatives[3];
}

function makeAlternativeArray() {
    var altArray = [questionArray.results[nextQuestionIndex].correct_answer, questionArray.results[nextQuestionIndex].incorrect_answers[0], questionArray.results[nextQuestionIndex].incorrect_answers[1], questionArray.results[nextQuestionIndex].incorrect_answers[2]];
    return altArray;
}

function selectAnswer(choice) {
    questionsAsked++;
    document.getElementById("currentQuiz").value = nextQuestionIndex + 1;
    if (alternatives[choice] == questionArray.results[nextQuestionIndex].correct_answer) {
        points++;
        document.getElementById("answer").innerHTML = "Correct!";
    } else {
        document.getElementById("answer").innerHTML = "Incorrect! The right answer was " + questionArray.results[nextQuestionIndex].correct_answer;
    }
    document.getElementById("result").innerHTML = "" + points + "/" + questionsAsked;
    nextQuestionIndex++;
    if (nextQuestionIndex < questionArray.results.length) {
        newQuestion();
        checkSettings();
    } else {
        document.getElementById("currentQuiz").value = 0;
        nextQuestionIndex = 0;
        getQuestions();
        console.log("Out of questions! Your total was " + points)
    }
}