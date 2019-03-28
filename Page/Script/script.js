var basicApiAdress = 'https://opentdb.com/api.php?amount=10&type=multiple';
var questionArray;
var nextQuestionIndex = 0;
var alternatives;
var points = 0;
var questionsAsked = 0;
var questionState = true;

getQuestions();

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

function checkSettings() {
    let category = document.getElementById("category");
    let difficulty = document.getElementById("difficulty");
    return basicApiAdress + '&category=' + category.value + '&difficulty=' + difficulty.value;
}

function newQuestion() {
    alternatives = makeAlternativeArray().sort();
    document.getElementById("question").innerHTML = questionArray.results[nextQuestionIndex].question;
    document.getElementById("alt0text").innerHTML = alternatives[0];
    document.getElementById("alt1text").innerHTML = alternatives[1];
    document.getElementById("alt2text").innerHTML = alternatives[2];
    document.getElementById("alt3text").innerHTML = alternatives[3];
}

function makeAlternativeArray() {
    var altArray = [questionArray.results[nextQuestionIndex].correct_answer, questionArray.results[nextQuestionIndex].incorrect_answers[0], questionArray.results[nextQuestionIndex].incorrect_answers[1], questionArray.results[nextQuestionIndex].incorrect_answers[2]];
    return altArray;
}

function selectAnswer(choice) {
    if (questionState) {
       // setAlternativeColors();
        document.getElementById("currentQuiz").value = nextQuestionIndex + 1;
        setAnswerColors();
        if (alternatives[choice] == questionArray.results[nextQuestionIndex].correct_answer) {
            points++;
            document.getElementById("answer").innerHTML = "Correct!";
        } else {
            document.getElementById("answer").innerHTML = "Incorrect! The right answer was " + questionArray.results[nextQuestionIndex].correct_answer;
        }
        questionsAsked++;
        document.getElementById("result").innerHTML = "" + points + "/" + questionsAsked;
        questionState = false;
    } else {
        document.getElementById("result").innerHTML = "" + points + "/" + questionsAsked;
        nextQuestionIndex++;
        checkQuestionIndex();
        setAlternativeColors();
        questionState = true;
    }
}

function checkQuestionIndex() {
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

function setAlternativeColors() {
    elements = document.getElementsByClassName("altbox");
    for (let i = 0; i < elements.length ; i++) {
        elements[i].style.backgroundColor = "#444";
    }
}

function setAnswerColors(){
    elements = document.getElementsByClassName("altbox");
    for (let i = 0; i < elements.length; i++) {
        if (alternatives[i] == questionArray.results[nextQuestionIndex].correct_answer) {
            elements[i].style.backgroundColor = "green";
        } else {
            elements[i].style.backgroundColor = "red"
        }
    }
}