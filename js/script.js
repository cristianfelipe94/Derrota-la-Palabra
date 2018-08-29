
//As soon as the page loads, the function 'Init' will run.
//Go down to see 'Init' function.
window.addEventListener('load', init);

//Create variables that will change.
//Let is for variables that the value will change.
//Const is for variable that the value will not change.


//Level changed.
let currentLevel = 6;

//Set the initial time to 5, will change depending on the level.
let timer = 6;

//Set the initial score to 0, everytime the game starts, the score will starts on 0.
let scored = 0;
let highScoredValue = 0;

//Declare a variable that will say if the game is running or not, Running=True, Stoped=False.
//Don't declare it as ''running=true'', because is implicit.
let running;

//Set the DOM elements that we need.
let seconds = document.getElementById ('seconds');
let currentWord = document.getElementById ('currentWord');
let wordInput = document.getElementById ('wordInput');
let message = document.getElementById ('message');
let keepTrying = document.getElementById ('keepTrying');
let timeDisplayed = document.getElementById ('time');
let scoreDisplayed = document.getElementById ('score');

//Level Options.
let easyOption = document.getElementById ('easy');
let mediumOption = document.getElementById ('medium');
let hardOption = document.getElementById ('hard');
let titleLevel = document.getElementById ('levelTitle');

//Score Chart elements.
let highScored = document.getElementById ('highScored');
let highScoreName = document.getElementById ('highScoreName');
let ptsScore = document.getElementById ('pts');
let wrapperChart = document.getElementById ('wrapperChart');

//Interactive Level, change colors on screen.
let bodyColor = document.getElementById ('bodyColor');

//Create a new variable with the words we need for the game to be displayed.
//Create an Array of random words.
const words = [
    'mae',
    'puravida',
    'tuanis',
    'diay!',
    'vibra',
    'hola',
    'todo bien?',
    'seas tonto',
    'chusma',
    'zapateada',
];

//Create a new variable with phrases.
//Phrases will be displayed as you win.
const win = [
    'Correcto!',
    'Genial!',
    'Bien hecho!',
    'Pudo ser mejor.',
    'Esa estuvo dificil.',
    'Ajaaa asi se hace!',
    'Y pensar que te iba mal en la escuela.',
    'Excelente!',
    'Esos dedos están que arden',
    'Rapido!',
];

//Init Game, this function will be active as the page load.
function init(){

    //First this function will load a word from the Array.
    //Function has to be declared out of the Main function.
    displayWords(words);

    //Show the seconds depending on the level.
    seconds.innerHTML = currentLevel;

    //The game will init when a word is inputed.
    //WordInput from the HTML ID, to the DOM.
    //WordInput is Waiting for an event, 'input' to start function 'StartGame'.
    //Function is out of Main Function.
    wordInput.addEventListener ('input', startGame);
    
    //Funtions to change level.
    //Btns from the HTML ID, to the DOM.
    //Btns waiting to change time.
    //Function is out of the Main Function.
    easyOption.addEventListener ('click', changeLevel1);
    mediumOption.addEventListener ('click', changeLevel2);
    hardOption.addEventListener ('click', changeLevel3);
    
    //Set Interval, to repeat a countDown.
    //MiliSeconds 1000, equals as 1 second.
    //Function CountDown is out of Main function.
    setInterval (countDown, 1000);

    //Check if game is Running=true or Running=False.
    //Every 500 miliseconds, check if the Status still true.
    //Functions Checkstatus is out of MainFunction.
    setInterval (checkStatus, 500);

    setInterval (checkHighScored, 500);

}



//Function Level 1 easy.
//Wont change time until match is over.
//As soon as you change Level the Game will reset some numbers so the user starts over.
function changeLevel1() {
    if (!running && timer === 0){
        currentLevel = 5;
        timer = 5;
        seconds.innerHTML = currentLevel;
        bodyColor.style.backgroundColor = "#3c4261";
        titleLevel.innerHTML = 'Dificultad Fácil.';
        titleLevel.style.fontSize = '22px';
        titleLevel.style.color = '#ffbf00';
        highScoreName.innerHTML = "";
        highScored.innerHTML = "";
        ptsScore.innerHTML = "";

    }else {
        message.innerHTML = 'Termina la ronda para cambiar de nivel.';
    }
}

//Function Level 2 medium.
//Won't change time until match is over.
//As soon as you change Level the Game will reset some numbers so the user starts over.
function changeLevel2() {
    if (!running && timer === 0){
        currentLevel = 3;
        timer = 3
        seconds.innerHTML = currentLevel;
        bodyColor.style.backgroundColor = "#272d50";
        titleLevel.innerHTML = 'Dificultad Medio.';
        titleLevel.style.fontSize = '22px';
        titleLevel.style.color = '#FF5B5B';
        highScoreName.innerHTML = "";
        highScored.innerHTML = "";
        ptsScore.innerHTML = "";

    }else {
        message.innerHTML = 'Termina la ronda para cambiar de nivel.';
    }
}

//Function Level 3 hard.
//Wont change time until match is over.
//As soon as you change Level the Game will reset some numbers so the user starts over.
function changeLevel3() {
    if (!running && timer === 0){
        currentLevel = 2;
        timer = 2
        seconds.innerHTML = currentLevel;
        bodyColor.style.backgroundColor = "#131628";
        titleLevel.innerHTML = 'Dificultad Difícil.';
        titleLevel.style.fontSize = '22px';
        titleLevel.style.color = '#ff1a72';
        highScoreName.innerHTML = "";
        highScored.innerHTML = "";
        ptsScore.innerHTML = "";

    }else {
        message.innerHTML = 'Termina la ronda para cambiar de nivel.';
    }
}


//Function to Start Game.
function startGame() {
    if (matchWords()) {
        running = true;
        timer = currentLevel + 1;
        displayWords (words);
        wordInput.value = '';
        scored++;
        highScoredValue++;
    }

    //If the scored is = to -1 the user should see 0, and not get the first courtesy point.
    if (scored === -1) {
        scoreDisplayed.innerHTML = 0;
    } else {
        scoreDisplayed.innerHTML = scored;
    }
}

//Function to Match Words, the InputWord with the CurrentWord.
function matchWords (){

    //WordInput.value = Return the Text that we input.
    //CurrentWord.innerHTML = Return the Text stored into currentWord.
    //Compare if both are the same.
    if (wordInput.value === currentWord.innerHTML) {

        //If they match.
        //Change the Element DOM Message to 'Correcto!'
        //ReturnTrue as is important to know if the state is True.
        displayWinPhrases (win);
        wordInput.style.borderColor = "#03B091";
        message.style.color = "#03B091";
        return true;
    } else {
        message.innerHTML = 'Incorrecto!';
        wordInput.style.borderColor = "#ff1a72";
        message.style.color = "#ff1a72";
        return false;
    }
}

//Create function to generate random words from the Array.
function displayWords(words) {

    //First generate a random number or random index to access the Array.
    //Math floor= Round down numbers. 
    //Math Random= Generate a random number.
    //Multiply = Multiply the random number by the length of the Array.
    const randomIndex = Math.floor(Math.random() * words.length);

    //In this function create the Output for the new word.
    //Change the current word for the new word, using the RandomIndex.
    //InnerHTML = Will set the new Text into the HTML element, from the Array Words, with the index number [RandomIndex].
    currentWord.innerHTML = words[randomIndex];
}

//Create a function to generate random phrases from the Array.
function displayWinPhrases (win) {

    //First generate a random number or random index to access the Array.
    //Math floor= Round down numbers. 
    //Math Random= Generate a random number.
    //Multiply = Multiply the random number by the length of the Array.
    const randomPhraseIndex = Math.floor(Math.random() * win.length);

    //In this function create the Output for the new word.
    //Change the current message for the new message, using the RandomPhraseIndex.
    //InnerHTML = Will set the new Text into the HTML element, from the Array Words, with the index number [RandomPhraseIndex].
    message.innerHTML = win[randomPhraseIndex];
}

function countDown() {

    //First Check time is not '0'.
    //If time is more than '0', decrease it by 1.
    //If time is equal to '0', game is over or Running = false.
    if (timer > 0) {
        timer--;
    }else if (timer === 0) {
        running = false;
    }
    //In this Function, display the time in the DOM.
    //Time is the Variable we declared at the top of the program.
    //Grap the new decreased time and display it on the DOM.
    timeDisplayed.innerHTML = timer;
}

//Check game status.
function checkStatus () {

    //If Running is False and Timer === 0, display message.
    //Message is a HTML element saved into the DOM.
    //Inner HTMl to display the Text into the DOM.
    if (!running && timer === 0) {

  
        message.innerHTML = 'Perdiste se acabó el tiempo!';
        message.style.fontSize = "22px";
        message.style.color = "#e51865";

        //Set score to -1, as the user should not be getting the initial point.
        scored = -1;
        
    }
}

//Check Scored.
function checkHighScored () {

    //Check if Score is higher that the HTML Score.
    //If that's true, overwritte the HTML with the NewScore.
    //Show a current message when bitting highest score.
    //As the Score and HighScoreValue increase by one, is necessary to Reset them to -1.
    if (scored > highScored.innerHTML) {
        highScoredValue = scored;
        highScoreName.innerHTML = 'Tu puntuación más alta es:';
        highScored.innerHTML = highScoredValue;
        highScored.style.color = "#03B091";
        ptsScore.innerHTML = 'pts.';
        wrapperChart.style.borderColor = "#03B091";

        highScoredValue = -1;

    //Check if HTML Score is higher that Score.
    //If that's true, is not necessary to overwritte the HTML with the NewScore.
    //Show a current message what the highest score was.
    //As the Score and HighScoreValue increase by one, is necessary to Reset them to -1.
    } else if (highScored.innerHTML > scored) {
        highScoreName.innerHTML = 'Tu puntuación más alta fue:';
        highScored.innerHTML = highScored.innerHTML;
        highScored.style.color = "#ff1a72";
        ptsScore.innerHTML = 'pts.';
        wrapperChart.style.borderColor = "#ff1a72";

        highScoredValue = -1;
    }
}   