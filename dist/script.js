const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const scoreElement = document.getElementById('score')
const finalScoreElement = document.getElementById('finalScore')
const startScreenElement = document.getElementById('startScreen')
const gameScreenElement = document.getElementById('gameScreen')
const endScreenElement = document.getElementById('endScreen')
const startBtnElement = document.getElementById('start-btn')

let var_score = 0;
function init(){
  startScreenElement.style.display = "block"
}

startBtnElement.onclick = function() {
  var_score = 0;
  scoreElement.innerText = var_score;
  startScreenElement.style.display = "none"
  gameScreenElement.style.display = "block"
  renderNewQuote();
  startTimer()
}


quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let right =true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('right')
      characterSpan.classList.remove('wrong')
      right = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('right')
      characterSpan.classList.remove('wrong')
    } else {
      characterSpan.classList.remove('right')
      characterSpan.classList.add('wrong')
      right=false
    }
  })

  if(right){
    changeScore();
    renderNewQuote()
  }
})

function getQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
  if (timerElement.innerText >= 0){
    const quote = await getQuote();
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
      const characterSpan = document.createElement('span')
      characterSpan.innerText = character
      quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
  } else if (timerElement.innerText <=0){
    endGame()
  }
}

function endGame(){
    finalScoreElement.innerText = scoreElement.innerText
    gameScreenElement.style.display = "none"
    endScreenElement.style.display = "block"
}

function startTimer(){
  var timeleft = 60;
  timerElement.innerText = timeleft
  var downloadTimer = setInterval(function(){
    if(timerElement.innerText < 1 || timerElement.innerText === 0){
      endGame();
    }
    timerElement.innerText = 120 - timeleft
    timeleft += 1;
  }, 1000);
}

function changeScore() {
  var_score+=1;
  scoreElement.innerText = var_score;
}

init();
