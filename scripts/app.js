const width = 10
const squares = []
let alienIndex = 0
let movingRight = true
let alienCount = 0 // counts movement
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid

//ALIEN CONSTRUCTION

class Alien {
  constructor(rank, startingIndex, alienMovement, alienHit, alienShoot) {
    this.rank = rank
    this.startingIndex = startingIndex
    this.alienMovement = alienMovement
    this.alienHit = alienHit
    this.alienShoot = alienShoot
  }
}

let startingIndex = ('alienIndex'+'rank')
let rank = null

const alienOne = new Alien(0, 0, false, false, false)
const alienTwo = new Alien(2, 1, false, false, false)
const alienThree = new Alien(3, 2, false, false, false)
// const alienFour = new Alien(4, 3, false, false, false)
// const alienFive = new Alien(5, 4, false, false, false)
// const alienSix = new Alien(6, 5, false, false, false)

//PLAYER MOVEMENT

// GRID INITIALISATION: for loop to fill grid with squares

function init() {
  const grid = document.querySelector('.grid')
  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    square.innerHTML = i
    grid.append(square)
  }

  const start = document.querySelector('#startBtn')
  start.addEventListener('click', moveEnemy)
  const ranks = document.querySelector('#ranksBtn')
  ranks.addEventListener('click', formRanks)
  const pause = document.querySelector('#pauseBtn')
  pause.addEventListener('click', pauseGame)

  // div[i].onclick = function(idx) {
  //   this.classList.remove("active");
  //   if(idx < div.length - 1) div[idx + 1].classList.add("active");
  // }.bind(div[i], i);
  function pauseGame() {
    console.log('pause button')
    let playerIndex = Math.floor(width * width - width)
    let alienIndex = 0
  }

  function formRanks() {
    console.log('form Ranks')
    squares[0].classList.add('alienOne')
    squares[1].classList.add('alienTwo')
    squares[2].classList.add('alienThree')
    // squares.forEach(square => square.classList.remove('alienOne'))
    // squares[startingIndex].classList.add('alienOne')
  }

  window.addEventListener('keydown', handleKeyDown)
  squares[playerIndex].classList.add('player')

  // ADD PLAYER & ENEMIES
  function movePlayer () {
    console.log(`the player should now move to position ${playerIndex}`)
    squares.forEach(square => square.classList.remove('player'))
    squares[playerIndex].classList.add('player', 'lastplayer')
  }

  function handleKeyDown(e) {
    let playerShouldMove = true
    console.log(e.keyCode)
    switch(e.keyCode) {
      case 39:
        if (playerIndex % width < width-1) {
          playerIndex++
        }
        break
      case 37:
        if (playerIndex % width > 0) {
          playerIndex--
        }
        break
      default:
        playerShouldMove = false
    }
    if (playerShouldMove) movePlayer()
  }


  // ALIEN MOVEMENT

  function moveEnemy() {
    squares.forEach(square => square.classList.remove('alienOne', 'alienTwo', 'alienThree'))
    // squares.forEach(square => square.classList.add('alienOne'))
    squares[alienIndex].classList.add('alienOne', 'alienTwo', 'alienThree')
  }


  const enemyMovementTimer = setInterval(alienMove, 500)
  setTimeout(()=> {
    clearInterval(enemyMovementTimer)
  }, 5000)

  function alienMove() {
    if (movingRight) {
      alienIndex ++
      moveEnemy()
      alienCount ++
      console.log(`alien id is ${rank} moving right`)
    } else if (!movingRight) {
      alienIndex --
      moveEnemy()
      alienCount --
      console.log('moving left')
    }

    if (alienCount === 9) {
      alienIndex += width
      movingRight = false
    } else if (alienCount === 0) {
      alienIndex += width
      movingRight = true
    } else if (alienCount === 89) {
      alienIndex = 89
      alienCount = 0
    }
  }
}



window.addEventListener('DOMContentLoaded', init)
