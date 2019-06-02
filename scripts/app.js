const width = 10
const squares = []
let alienIndex = 0
// let moving = false
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

// let startingIndex = ('alienIndex'+'rank')
// let rank = null
const alienOne = new Alien(0, 0, true, false, false)
const alienTwo = new Alien(2, 1, true, false, false)
const alienThree = new Alien(3, 2, true, false, false)




function init() {
  // GRID INITIALISATION: for loop to fill grid with squares
  const grid = document.querySelector('.grid')
  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    square.innerHTML = i
    grid.append(square)
  }

  // PAUSE BUTTON - doesn't fucking work!
  // function pauseGame() {
  //   console.log('pause button')
  //   // let playerIndex = Math.floor(width * width - width)
  //   // let alienIndex = 0
  // }

  // ALIEN BUILD
  function formRanks() {
    console.log('form Ranks')
    squares[0].classList.add('alienOne')
    squares[1].classList.add('alienTwo')
    squares[2].classList.add('alienThree')
  }

  squares[playerIndex].classList.add('player')
  squares[alienIndex].classList.add('alienOne')
  const ranks = document.querySelector('#ranksBtn')
  const start = document.querySelector('#startBtn')
  // const pause = document.querySelector('#pauseBtn')


  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  ranks.addEventListener('click', formRanks)
  start.addEventListener('click', alienMove)
  // pause.addEventListener('click', pauseGame)

  //PLAYER MOVEMENT

  function handleKeyDown(e) {
    let playerShouldMove = true
    let missileShouldFire = false
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
        missileShouldFire = true
        fireMissile()
        break
      default:
        playerShouldMove = false
        missileShouldFire = false
    }
    if (playerShouldMove) movePlayer()
    if (missileShouldFire) fireMissile()
  }

  function movePlayer () {
    squares.forEach(square => square.classList.remove('player'))
    squares[playerIndex].classList.add('player')
  }


  // MISSILE MOVEMENT & TIMER
  function fireMissile () {
    moveMissile()
    const missileTimer = setInterval(moveMissile, 500)
    setTimeout(()=> {
      clearInterval(missileTimer)
    }, 1500)
  }


  function moveMissile() {
    let missileIndex = (playerIndex -= width)
    console.log(missileIndex)
    squares[missileIndex].classList.add('missile')
    // missileIndex += width
    // squares.forEach(square => square.classList.remove('missile'))
  }



  // ALIEN MOVEMENT & TIMER
  function moveEnemy() {
    squares.forEach(square => square.classList.remove('alienOne'))
    squares[alienIndex].classList.add('alienOne')
    squares.forEach(square => square.classList.remove('alienTwo'))
    squares[1].classList.add('alienTwo')
    squares.forEach(square => square.classList.remove('alienThree'))
    squares[2].classList.add('alienThree')
  }


  function alienMove() {
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 5000)
    const enemyMovementTimer = setInterval(alienMove, 500)
    console.log('aliens should move')
    if (movingRight) {
      console.log('aliens should move right')
      alienIndex ++
      moveEnemy()
      alienCount ++
    } else if (!movingRight) {
      console.log('aliens should move left')
      alienIndex --
      moveEnemy()
      alienCount --
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
