const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['blue', 'yellow'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
   event.preventDefault()
   screens[0].classList.add('up')
})
//делегирование событий
timeList.addEventListener('click', event => 
{
   if (event.target.classList.contains('time-btn')) {
      time = parseInt(event.target.getAttribute('data-time'))
      screens[1].classList.add('up')
      startGame()
   }
})

function startGame() {
   setInterval(decreaseTime, 1000)
   createRandomCircle()
   setTime(time)
}

board.addEventListener('click', event => {
   if (event.target.classList.contains('circle')) {
      score++
      event.target.remove()
      createRandomCircle()
   }
})

function createRandomCircle() {
   const circle = document.createElement('div')
   const size = getRandomSize(10, 60)
   // деструктуризация
   const { width, height } = board.getBoundingClientRect()
   const x = getRandomSize(0, width - size)
   const y = getRandomSize(0, height - size)

   circle.classList.add('circle')
   circle.style.backgroundColor = getRandomColor()
   circle.style.width = `${size}px`
   circle.style.height = `${size}px`
   circle.style.top = `${y}px`
   circle.style.left = `${x}px`

   //!!!
   circle.addEventListener('mouseover', () => setColor(circle)) // должен быть КЛИК

   board.append(circle)
}

function getRandomSize(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}

//* начало изменений

function setColor(element) {
   const color = getRandomColor()
   element.style.backgroundColor = color
   element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
   const index = Math.floor(Math.random() * colors.length)
   return colors[index]
}

//* до этого места

function decreaseTime() {
   if (time === 0) {
      finishGame()
   } else {
      let current = --time
      if (current < 10) {
         current = `0${current}`
      }
      setTime(current)
   }
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`
}

function finishGame() {
   timeEl.parentNode.classList.add('hide')
   board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span></h1>`
}