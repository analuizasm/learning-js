var questionContainer = document.querySelector('.quiz-container');
let questionTitle = document.querySelector('.question-title');
let answersContainer = document.querySelector('.question-answers');
let resultText = document.getElementById("result");
let questionIndex, shuffledOptions, score = 0;
let scoreContainer = document.getElementById('userScore');
let buttonEnabled = false;
let questionsArray;
const SCORE_DEFAULT = 100;
const TOTAL_QUESTIONS = 10;


function setQuestionsArray(questions){
    questionsArray = questions;
    startGame();
}

function startGame(){ //initialize all variables to start the game
    questionIndex = 0;
    incrementScore(0);
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");

    selectQuestion();
}

function selectQuestion(){ //prepares the next question
    if(questionIndex < TOTAL_QUESTIONS){
        let order = shuffleAnswer() 
        showQuestion(questionsArray.results[questionIndex], order);
    }else{
        endGame();
    }
}

function shuffleAnswer(){  //a function to assist in randomizing the order of the question answers
    let order = [0,1,2,3];
    order.sort(() => Math.random() - 0.5);

    return order;
}

function showQuestion(currentQuestion, order){ //formats the question
    questionTitle.innerHTML = questionIndex+1 +"/" + TOTAL_QUESTIONS + " - " + currentQuestion.question;

    for(let i = 0; i < order.length; i++){
        let questionAnswer = document.createElement('button');
        questionAnswer.classList.add("alternatives");
        questionAnswer.innerHTML =  order[i] == 3 ? currentQuestion["correct_answer"] : currentQuestion["incorrect_answers"][order[i]];
        questionAnswer.addEventListener('click', answerVerify);
        buttonEnabled = true;
        answersContainer.appendChild(questionAnswer);
    };

    function answerVerify(e){ //checks the answer chosen by the user and gives the result
        if(!buttonEnabled) return;

        buttonEnabled = false;
        let elementClass;

        if(e.target.textContent == currentQuestion["correct_answer"]){
            incrementScore(SCORE_DEFAULT);
            elementClass = "correct_answer";
            e.target.classList.add(elementClass);
        }else{
            elementClass = "incorrect_answer";
            e.target.classList.add(elementClass);
        }

        setTimeout(()=> { //move on to the next question
            e.target.classList.remove(elementClass);
            questionIndex++;
            clearAlternatives();
            selectQuestion();
        }, 1200);
    }
}

function clearAlternatives(){ //clears the alternatives from the previous question
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function incrementScore(points){
    if(points == 0) score = 0;
    score += points;
    scoreContainer.innerHTML = "Score: " + score;
}

function endGame(){ //generates the game end screen
    let tryAgain = document.getElementById('newGame');
    answersContainer.classList.add("hide");
    questionTitle.textContent = "You have reached the end of the quiz :)";
    tryAgain.textContent = "Try Again";
    tryAgain.classList.remove("hide");
    tryAgain.addEventListener('click', ()=>{
        tryAgain.classList.add("hide");
        answersContainer.classList.remove("hide");
        sendApiRequest();
    });
}
