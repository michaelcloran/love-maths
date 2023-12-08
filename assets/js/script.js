
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for(let button of buttons){
        button.addEventListener("click", function(){
            if(this.getAttribute("data-type") === "submit"){
                checkAnswer();
            }else{
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * the main game "loop", called when the script is first loaded
 * and after the users answer has been processed
 */
function runGame(gameType){

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //create 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if(gameType === "addition"){
        displayAdditionQuestion(num1, num2);
    }else if(gameType === "subtract"){
        displaySubtractQuestion(num1, num2);
    }else if(gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    }else{
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * checks the answer against the first element in
 * the returned claculateCorrectAnswer array
 */
function checkAnswer(){

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let claculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer == claculatedAnswer[0];

    if(isCorrect){
        alert("Hey! You got it right! :D");
        incrementScore();
    }else{
        alert(`Awwww....... you ansered ${userAnswer}. The correct answer was ${claculatedAnswer[0]}`);
        incrementWrongAnswer();
    }
    runGame(claculatedAnswer[1]);
}

/**
 * gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from DOM and returns correct answer
 */
function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if(operator === "+"){
        return [operand1 + operand2, "addition"];
    }else if(operator === "-"){
        return [operand1 - operand2, "subtract"];
    }else if(operator === "x"){
        return [operand1 * operand2, "multiply"];
    }else{
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplementated operator ${operator}. Aborting!`;
    }
}

/**
 * gets the current score and increments by 1
 */
function incrementScore(){
    let oldScore = parseInt(document.getElementById("score").innerText);
    oldScore+= 1;
    document.getElementById("score").textContent = oldScore;
}

/**
 * gets the current incorrect answers and increments by 1
 */
function incrementWrongAnswer(){
    let wrongAnswerCnt = parseInt(document.getElementById("incorrect").innerText);
    wrongAnswerCnt+= 1;
    document.getElementById("incorrect").textContent = wrongAnswerCnt;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2){
    if(operand2 > operand1){
        document.getElementById('operand1').textContent = operand2;
        document.getElementById('operand2').textContent = operand1;
        document.getElementById('operator').textContent = "-";
    }else{
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operand2').textContent = operand2;
        document.getElementById('operator').textContent = "-";
    }
}

function displayMultiplyQuestion(operand1, operand2){
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

