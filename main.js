const inputArea= document.getElementById('text-box');
const display = document.getElementById('display-box');
const accuracy_text = document.getElementById('accuracy');
const wordstotype = [
    "I can learn how to code if i persevere",
    "I make mistakes because I'm always operating at my limit. If I only stay in comfortable territory all the time, that's not so much fun.",
    "If you learn how to solve problems, you can go through life and do pretty well.",
    "To be successful, you want to surround yourself with very talented folks whose skills blend very well. That's the secret of success.",
    "Good judgement comes from experience. Experience comes from bad judgement."
]


const timerDisplay  = document.querySelector(".countdown-timer");
const startbtn = document.getElementById('startbtn');

let endmessage = document.getElementById('message');
let timer;
let countdown;
let characterTyped = 0;
let errors = 0;
let timeElapsed = 0;
let seconds = 60;
let wpm_container = document.getElementById('wpm');

var i = 0;
var text = "Speed typing Game";
var speed = 100;

function typewrite() {
  if (i < text.length) {
    document.querySelector('h1').innerHTML += text.charAt(i);
    i++;
    
  }
}

setInterval(typewrite, speed);

function randomWords() {
    return Math.floor(Math.random() * wordstotype.length)
  }

//creates a span element for each character in wordstotype to type and adds it to display div 
function displayquote(){
    display.textContent = null;
    wordstotype[randomWords()].split("").forEach (character => {
       
        const span_char = document.createElement('span')
        span_char.innerText = character
        display.appendChild(span_char)
        
    })
}

function checkcorrect(typedchar) {
   
    const currentc = document.querySelectorAll('span')

    //loops through each character in span element array comparint it to character in input area

    currentc.forEach((charspan, index) => {

        const character = typedchar[index]//character represents each character that is in inputArea

        //charspan represents each character inside the span classes 

        if (character == null) {
            charspan.classList.remove('correct');
            charspan.classList.remove('wrong');  
        } else if (character == charspan.innerText) {
            
            charspan.classList.add('correct');
            charspan.classList.remove('wrong');
            characterTyped += 1;

        } else {
            
            charspan.classList.add('wrong');
            charspan.classList.remove('correct');
            characterTyped += 1;
            errors++;

        }

        if (typedchar.length == currentc.length) {
            seconds = 0;         
        }
                
    })

    let wpm_score = Math.round((((characterTyped / 5) / timeElapsed)));
    let correctCharacters = (characterTyped - errors);
    let accuracyVal = ((correctCharacters / characterTyped) * 100);

    accuracy_text.textContent = Math.round(accuracyVal);
    wpm_container.innerText = wpm_score;
    accuracy_text.hidden = true;
    wpm_container.hidden = true;
    //console.log(wpm_score) for debugging

     return wpm_container;
}


function readData(){ 
    inputArea.addEventListener('input', () =>{
        typedchar = inputArea.value.split('');
        correctcharacter = checkcorrect(typedchar);
        
    });   

}

function updatetimer() {
    
    if (seconds > 0) {
        seconds--;
        timeElapsed += 1;
        timerDisplay.innerHTML = seconds + "s";
    } else if (seconds === 0 && inputArea.value == "") {
        inputArea.disabled = true;
        timerDisplay.hidden = true;
        endmessage.innerText = `Please try again by clicking Reset`;
    } else { 
        timerDisplay.innerHTML = `Time taken : ${timeElapsed}s`;
        endmessage.innerText = 
        `Word per minute : ${wpm_container.innerText} 
         Accuracy : ${accuracy_text.innerText}%`;
        inputArea.disabled = true;
        wpm_container.hidden = true;
        accuracy_text.hidden = true;
    }
}
    
function startgame() {
    startbtn.addEventListener('click', () => {

        document.getElementsByClassName('hidden')[0].classList.remove('hidden');
        document.querySelector('h1').classList.add('invisible');
        startbtn.classList.add('collapse');
        updatetimer()
        timer = setInterval(updatetimer , 1000);
        displayquote();
        readData();
    })
  
}

startgame()

