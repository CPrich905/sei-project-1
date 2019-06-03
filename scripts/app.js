const width = 10
// const rows = [] // only needed if using row format
const squares = []
const aliens = []
let alienIndex = 0
let movingRight = true
let alienCount = 0 // counts movement across grid width
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid
let missilePosition = null


//ALIEN CONSTRUCTION

class Alien {
  constructor(rank, startingIndex, position, alienHit, alienShoot, alienCount) {
    this.rank = rank
    this.startingIndex = startingIndex
    this.position = startingIndex
    this.alienhit = alienHit
    this.alienShoot = alienShoot
    this.alienCount = alienCount
  }
  moveEnemy() {
    squares[this.position].classList.remove('alien')
    if (movingRight) {
      this.position ++
      this.alienCount ++
    } else {
      this.position --
      this.alienCount --
    }
    squares[this.position].classList.add('alien')
  }
  dropLine() {
    squares[this.position].classList.remove('alien')
    this.position += width
    movingRight = !movingRight
    squares[this.position].classList.add('alien')
  }
}

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
      missilePosition = playerIndex - width
      break
    default:
      playerShouldMove = false
      missileShouldFire = false
  }
  if (playerShouldMove) movePlayer()
  if (missileShouldFire) fireMissile()
}


//PLAYER MOVEMENT
function movePlayer () {
  squares.forEach(square => square.classList.remove('player'))
  squares[playerIndex].classList.add('player')
}

// MISSILE MOVEMENT & TIMER
function fireMissile () {
  squares[missilePosition].classList.add('missile')
  const missileTimer = setInterval(moveMissile, 1000)
  setTimeout(()=> {
    clearInterval(missileTimer)
  }, 8500)
}

function moveMissile() {
  squares[missilePosition].classList.remove('missile')
  missilePosition -= width
  squares[missilePosition].classList.add('missile')
  if (squares[missilePosition].classList.contains('alien')) {
    console.log('hit')
    hit()
  }
}

function hit() {
  squares[missilePosition].classList.remove('missile', 'alien')
}

function init() {
  // GRID INITIALISATION: for loop to fill grid with squares
  // GRID - 8 LINES
  const grid = document.querySelector('.grid')
  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    square.innerHTML = i
    grid.append(square)
  }
  // GRID/ROW COMBINATION - 16 LINES
  // for (let i = 0; i < width; i++) {
  //   const row = document.createElement('div')
  //   row.classList.add('grid-row')
  //   rows.push(row)
  //   grid.append(row)
  // }
  // //GRID in ROW
  // rows.forEach((row, index) => {
  //   for (let i = 0; i < width; i++) {
  //     const square = document.createElement('div')
  //     square.classList.add('grid-item')
  //     squares.push(square)
  //     square.innerHTML = index*width+i
  //     row.append(square)
  //   }
  // })



  aliens.push(new Alien(0, 0, true, false, false, 0))
  aliens.push(new Alien(1, 2, true, false, false, 0))
  aliens.push(new Alien(2, 4, true, false, false, 0))


  squares[playerIndex].classList.add('player')
  const start = document.querySelector('#startBtn')
  const pause = document.querySelector('#pauseBtn')
  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', play)
  pause.addEventListener('click', pauseGame)

  // ALIEN MOVEMENT & TIMER

  function play() {
    const enemyMovementTimer = setInterval(alienMove, 500)
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 10000)
  }
  // PAUSE BUTTON - doesn't fucking work!
  function pauseGame(enemyMovementTimer) {
    console.log('pause button')
    setTimeout(() => {
      clearInterval(enemyMovementTimer)
    })
  }

  function alienMove() {
    if (movingRight) {
      // console.log('move right')
      aliens.forEach(alien => {
        alien.moveEnemy()
        // console.log('count is', alienCount)
      })
      alienCount ++
    } else if (!movingRight) {
      // console.log('moving left')
      aliens.forEach(alien => {
        alien.moveEnemy()
        // console.log('count is', alienCount)
      })
      alienCount --
    }

    if (alienCount === 5) {
      aliens.forEach(alien => {
        alien.dropLine()
        // alien.position += width+1
        // movingRight = !movingRight
      })
    } else if (alienCount === 0) {
      aliens.forEach(alien => {
        alien.dropLine()
        // alien.position += width-1
        // movingRight = !movingRight
      })
    }

  }

}


window.addEventListener('DOMContentLoaded', init)
