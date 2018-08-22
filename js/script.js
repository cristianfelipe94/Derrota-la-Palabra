
//As soon as the page loads, the function 'Init' will run.
//Go down to see 'Init' function.
window.addEventListener('load', init);

//Create variables that will change.
//Let is for variables that the value will change.
//Const is for variable that the value will not change.

//Set the initial time to 5, will change depending on the level.
let timer = 5;

//Set the initial score to 0, everytime the game starts, the score will starts on 0.
let scored = 0;

//Declare a variable that will say if the game is running or not, Running=True, Stoped=False.
//Don't declare it as ''running=true'', because is implicit.
let running;

//Set the DOM elements that we need.
let seconds = document.getElementById ('seconds');
let currentWord = document.getElementById ('currentWord');
let wordInput = document.getElementById ('wordInput');
let message = document.getElementById ('message');
let timeDisplayed = document.getElementById ('time');
let scoreDisplayed = document.getElementById ('score');

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

//Init Game, this function will be active as the page load.
function init(){

    //First this function will load a word from the Array.
    //Function has to be declared out of the Main function.
    displayWords(words);

    //The game will init when a word is inputed.
    //WordInput from the HTML ID, to the DOM.
    //WordInput is Waiting for an event, 'input' to start function 'StartGame'.
    //Function is out of Main Function.
    wordInput.addEventListener ('input', startGame);

    //Set Interval, to repeat a countDown.
    //MiliSeconds 1000, equals as 1 second.
    //Function CountDown is out of Main function.
    setInterval (countDown, 1000);

    //Check if game is Running=true or Running=False.
    //Every 500 miliseconds, check if the Status still true.
    //Functions Checkstatus is out of MainFunction.
    setInterval (checkStatus, 500);
    console.log ('true');
}

//Function to Start Game.
function startGame() {
    if (matchWords()) {
        running = true;
        timer = 6;
        displayWords (words);
        wordInput.value = '';
        scored++;
    }
    scoreDisplayed.innerHTML = scored;
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
        message.innerHTML = 'Correcto!';
        return true;
    } else {
        message.innerHTML = 'Incorrecto!';
        return false;
    }
}

//Create function to generate random words from the array.
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
    }
}