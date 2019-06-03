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
  }, 3000)
}

function moveMissile() {
  squares[missilePosition].classList.remove('missile')
  missilePosition -= width
  squares[missilePosition].classList.add('missile')
}

function init() {
  // GRID INITIALISATION: for loop to fill grid with squares
  // GRID - 8 LINES (need to change move & )
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

  // PAUSE BUTTON - doesn't fucking work!
  // function pauseGame() {
  //   console.log('pause button')
  //   // let playerIndex = Math.floor(width * width - width)
  //   // let alienIndex = 0
  // }


  aliens.push(new Alien(0, 0, true, false, false, 0))
  aliens.push(new Alien(1, 2, true, false, false, 0))
  aliens.push(new Alien(2, 4, true, false, false, 0))
  console.log('array', aliens)


  squares[playerIndex].classList.add('player')
  const start = document.querySelector('#startBtn')


  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', play)

  // ALIEN MOVEMENT & TIMER

  function play() {
    const enemyMovementTimer = setInterval(alienMove, 500)
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 10000)
  }
  // Counts across grid & drops a line at the end of each row
  function alienMove() {
    if (movingRight) {
      console.log('move right')
      aliens.forEach(alien => {
        alien.moveEnemy()
        console.log('count is', alienCount)
      })
      alienCount ++
    } else if (!movingRight) {
      console.log('moving left')
      aliens.forEach(alien => {
        alien.moveEnemy()
        console.log('count is', alienCount)
      })
      alienCount --
    }

    if (alienCount === 4) {
      aliens.forEach(alien => {
        // alien.moveEnemy()
        alien.position += width
        movingRight = !movingRight
        console.log(`this alien is at ${alien.position}`)
      })
    } else if (alienCount === 0) {
      aliens.forEach(alien => {
        // alien.moveEnemy()
        alien.position += width
        movingRight = !movingRight
      })
    }
    //   // alienIndex += width
    //   // alienIndex.moveCounter += width
    //   alien.position += width
    //   movingRight = true
    //   console.log('drop line left')
    // } else if (alienCount === 89) {
    //   alien.position = 89
    //   alienCount = 0
    // }

  }

}


window.addEventListener('DOMContentLoaded', init)
