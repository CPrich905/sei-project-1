const width = 10
const rows = []
const squares = []
const aliens = []
let alienIndex = 0
let movingRight = true
let alienCount = 0 // counts movement
let playerIndex = Math.floor(width * width - 1) // will put player to bottom LHS of grid


//ALIEN CONSTRUCTION

class Alien {
  constructor(rank, startingIndex, position, moveCounter, alienHit, alienShoot) {
    this.rank = rank
    this.startingIndex = startingIndex
    this.position = startingIndex+moveCounter
    this.moveCounter = 0
    this.alienhit = alienHit
    this.alienShoot = alienShoot
  }
  moveEnemy() {
    squares[this.position].classList.remove('alien')
    this.position++
    squares[this.position].classList.add('alien')
  }
}

function handleKeyDown(e) {
  let playerShouldMove = true
  let missileShouldFire = false
  switch(e.keyCode) {
    case 39:
      if (playerIndex % width > 0 ) {
        playerIndex--
      }
      break
    case 37:
      if (playerIndex % width < width-1) {
        playerIndex++
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


//PLAYER MOVEMENT
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
  let missilePosition = (playerIndex - width)
  console.log(missilePosition)
  squares[missilePosition].classList.remove('missile')
  missilePosition-=width
  squares[missilePosition].classList.add('missile')
  // squares[this.position].classList.remove('alien')
  // this.position++
  // squares[this.position].classList.add('alien')
}

function init() {
  // GRID INITIALISATION: for loop to fill grid with squares
  const grid = document.querySelector('.grid')
  for (let i = 0; i < width; i++) {
    const row = document.createElement('div')
    row.classList.add('grid-row')
    rows.push(row)
    // row.innerHTML = i
    grid.append(row)
  }
  //GRID in ROW
  rows.forEach((row, index) => {
    for (let i = 0; i < width; i++) {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      square.innerHTML = index*width+i
      row.append(square)
    }
  })

  // PAUSE BUTTON - doesn't fucking work!
  // function pauseGame() {
  //   console.log('pause button')
  //   // let playerIndex = Math.floor(width * width - width)
  //   // let alienIndex = 0
  // }


  // ALIEN BUILD - pushing 3 to array
  // function formRanks () {
  //   console.log('form ranks')
  aliens.push(new Alien(0, 0, true, false, false))
  aliens.push(new Alien(2, 1, true, false, false))
  aliens.push(new Alien(3, 2, true, false, false))

  // }


  squares[playerIndex].classList.add('player')
  // const ranks = document.querySelector('#ranksBtn')
  const start = document.querySelector('#startBtn')
  // const pause = document.querySelector('#pauseBtn')


  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  // ranks.addEventListener('click', formRanks)
  start.addEventListener('click', play)
  // pause.addEventListener('click', pauseGame)



  // ALIEN MOVEMENT & TIMER



  function play() {
    const enemyMovementTimer = setInterval(alienMove, 500)
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 7000)
  }

  function alienMove() {
    console.log('aliens should move')
    if (movingRight) {
      console.log('aliens should move right')
      alienIndex ++
      aliens[0].moveEnemy()
      alienCount ++
    }
    // else if (!movingRight) {
    //   console.log('aliens should move left')
    //   alienIndex --
    //   moveEnemy()
    //   alienCount --
    // }

    // if (alienCount === 9) {
    //   alienIndex += width+1
    //   movingRight = false
    // } else if (alienCount === 0) {
    //   alienIndex += width+1
    //   movingRight = true
    // } else if (alienCount === 89) {
    //   alienIndex = 89
    //   alienCount = 0
    // }
  }

}


window.addEventListener('DOMContentLoaded', init)
