var startButton = document.getElementById("start-quiz");
startButton.addEventListener('click', sendApiRequest);

async function sendApiRequest(){
    let response = await fetch(`https://opentdb.com/api.php?amount=10&category=18&type=multiple`);
    let questions = await response.json();
    setQuestionsArray(questions);
};