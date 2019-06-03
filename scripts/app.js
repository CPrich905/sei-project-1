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
  constructor(rank, startingIndex, position, alienhit, alienShoot, alienCount) {
    this.rank = rank
    this.startingIndex = startingIndex
    this.position = startingIndex
    this.alienhit = false
    this.alienShoot = alienShoot
    this.alienCount = alienCount
  }
  moveEnemy() {
    squares[this.position].classList.remove('alien')
    squares[this.position].removeAttribute('id')
    if (movingRight) {
      this.position ++
      this.alienCount ++
    } else {
      this.position --
      this.alienCount --
    }
    squares[this.position].classList.add('alien')
    squares[this.position].id = this.rank
  }
  dropLine() {
    squares[this.position].classList.remove('alien')
    squares[this.position].removeAttribute('id')
    this.position += width
    movingRight = !movingRight
    squares[this.position].classList.add('alien')
    squares[this.position].id = this.rank
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
  const missileTimer = setInterval(moveMissile, 400)
  setTimeout(()=> {
    clearInterval(missileTimer)
  }, 3000)
}

function moveMissile() {
  squares[missilePosition].classList.remove('missile')
  missilePosition -= width
  squares[missilePosition].classList.add('missile')
  if (squares[missilePosition].classList.contains('alien')) {
    checkHit()
  }
}

function checkHit() {
  console.log('hit')
  squares.forEach(square => {
    if(square.classList.contains('missile') && square.classList.contains('alien')) {
      square.classList.remove('alien', 'missile')
      console.log(square.id)
      console.log('aliens in checkHit', aliens)
      const deadAliens = aliens.find(alien => alien.rank === parseInt(square.id))
      console.log(deadAliens)
      deadAliens.alienhit = true

      // aliens.id.alienHit = true // work out which alien is hit, change alienHit to true
      // console.log(aliens[this.rank])
      // square.classList.remove('missile')
    }
  })
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


  aliens.push(new Alien(0, 0, true, false, false, 0))
  aliens.push(new Alien(1, 2, true, false, false, 0))
  aliens.push(new Alien(2, 4, true, false, false, 0))
  console.log(aliens)
  console.log(aliens.find(alien => alien.rank === 0))

  squares[playerIndex].classList.add('player')
  const start = document.querySelector('#startBtn')
  const pause = document.querySelector('#pauseBtn')
  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', play)
  pause.addEventListener('click', pauseGame)

  // ALIEN MOVEMENT & TIMER

  function play() {
    const enemyMovementTimer = setInterval(alienMove, 700)
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
        if (!alien.alienhit) alien.moveEnemy()
        // console.log('count is', alienCount)
      })
      alienCount ++
    } else if (!movingRight) {
      // console.log('moving left')
      aliens.forEach(alien => {
        if (!alien.alienhit) alien.moveEnemy()
        // console.log('count is', alienCount)
      })
      alienCount --
    }

    if (alienCount === 5) {
      aliens.forEach(alien => {
        if (!alien.alienhit) alien.dropLine()
        // alien.position += width+1
        // movingRight = !movingRight
      })
    } else if (alienCount === 0) {
      aliens.forEach(alien => {
        if (!alien.alienhit) alien.dropLine()
        // alien.position += width-1
        // movingRight = !movingRight
      })
    }
  }

}


window.addEventListener('DOMContentLoaded', init)
