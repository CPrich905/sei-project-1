const width = 10
const squares = []
let alienIndex = 0
let moving = false
let movingRight = true
let alienCount = 0 // counts movement
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid

//ALIEN CONSTRUCTION

class Alien {
  constructor(rank, startingIndex, alienMove, alienHit, alienShoot) {
    this.rank = rank
    this.startingIndex = startingIndex
    this.alienMove = alienMove
    this.alienHit = alienHit
    this.alienShoot = alienShoot
  }
}

let startingIndex = ('alienIndex'+'rank')
let rank = null

const alienOne = new Alien(0, 0, true, false, false)
const alienTwo = new Alien(2, 1, true, false, false)
const alienThree = new Alien(3, 2, true, false, false)


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



  function pauseGame() {
    console.log('pause button')
    // let playerIndex = Math.floor(width * width - width)
    // let alienIndex = 0
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
    squares.forEach(square => square.classList.remove('player'))
    squares[playerIndex].classList.add('player')
  }

  function fireMissile () {
    console.log('Fire!')
    squares.forEach(square => square.classList.add('missile'))
  }

  function handleKeyDown(e) {
    let playerShouldMove = true
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
      case 32:
        fireMissile()
        break
      default:
        playerShouldMove = false
    }
    if (playerShouldMove) movePlayer()
  }

  // div[i].onclick = function(idx) {
  //   this.classList.remove("active");
  //   if(idx < div.length - 1) div[idx + 1].classList.add("active");
  // }.bind(div[i], i);
  // ALIEN MOVEMENT
  const ranks = document.querySelector('#ranksBtn')
  const start = document.querySelector('#startBtn')
  const pause = document.querySelector('#pauseBtn')
  ranks.addEventListener('click', formRanks)
  start.addEventListener('click', alienMove)
  pause.addEventListener('click', pauseGame)

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
      console.log(`alien rank ${this.rank} moving right`)
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
