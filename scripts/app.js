const width = 10
const squares = []
const aliens = []
// let alienIndex = 0
let movingRight = true
let alienCount = 0 // counts movement across grid width
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid
let missilePosition = null
let bombPosition = null


// PLAYER CONSTRUCTION
// class Player {
//   constructor(startingIndex, shoot, move, lives, hit) {
//     this.startingIndex = startingIndex
//     this.shoot = false
//     this.move = false // change to true on startBtn?
//     this.lives = 3
//     this.hit = false
//   }
  // movePlayer() {
  //   //link code from main section
  // }
  // playerShoot() {
  //   //link code from main section
  //   //ammunition?
  // }
  // playerLives() {
  //   //may be needed for scoreboard
  // }
// }

//ALIEN CONSTRUCTION

class Alien {
  constructor(rank, startingIndex, position, alienhit, alienShouldFire, alienCount) {
    this.rank = rank
    this.startingIndex = startingIndex
    this.position = startingIndex
    this.alienhit = false
    this.alienShouldFire = false
    this.alienCount = alienCount
  }
  moveEnemy() {
    squares[this.position].classList.remove('alien')
    // squares[this.position].removeAttribute('id')
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
    // squares[this.position].removeAttribute('id')
    this.position += width
    movingRight = !movingRight
    squares[this.position].classList.add('alien')
    squares[this.position].id = this.rank
  }
  bombsAway() {
    console.log('bombs away')
    squares[this.position+width].classList.add('bomb')
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
    case 83:
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


//PLAYER MOVEMENT---------------------------------------------------------------
//move to player constructor
function movePlayer () {
  squares.forEach(square => square.classList.remove('player'))
  squares[playerIndex].classList.add('player')
}

// Player MISSILE MOVEMENT & TIMER
// move to player constructor
function fireMissile () {
  squares[missilePosition].classList.add('missile')
  const missileTimer = setInterval(moveMissile, 400)
  //clear missile if top row or bottom row - may need to go in alienhit function
  setTimeout(()=> {
    clearInterval(missileTimer)
  }, 3400)
}

function moveMissile() {
  squares[missilePosition].classList.remove('missile')
  missilePosition -= width
  squares[missilePosition].classList.add('missile')
  if (squares[missilePosition].classList.contains('alien')) {
    checkHit()
  }
}
// CHECK HIT ON ALIEN ----------------------------------------------------------
function checkHit() {
  console.log('hit')
  squares.forEach(square => {
    if(square.classList.contains('missile') && square.classList.contains('alien')) {
      square.classList.remove('alien', 'missile')
      // console.log(square.id)
      // console.log('aliens in checkHit', aliens)
      const deadAliens = aliens.find(alien => alien.rank === parseInt(square.id))
      // console.log(deadAliens)
      deadAliens.alienhit = true
      // push score to scoreboard
    }
  })
}


// ALIEN SHOOT --------------------------------------------------------------
// function  alienShoot() {
//  // function to take prompt from alienMove/start button
//  // take player shoot function & duplicate with missile firing down screen
//  // push score to scoreboard
// }

// CHECK HIT ON PLAYER --------------------------------------------------------
// if playerHit
// add class 'flashing' for 3 seconds
// push innerHTML to scoreboard


// INIT ---------------------------------------------------------------INIT
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


  aliens.push(new Alien(0, 0, null, true, false, false, 0))
  aliens.push(new Alien(1, 2, null, true, false, false, 0))
  aliens.push(new Alien(2, 4, null, true, false, false, 0))
  console.log(aliens)
  console.log(aliens.find(alien => alien.rank === 0))

  squares[playerIndex].classList.add('player')
  const start = document.querySelector('#startBtn')
  const pause = document.querySelector('#pauseBtn')
  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', play)
  pause.addEventListener('click', pauseGame)

  // ALIEN MOVEMENT & TIMER----------------------------------------------------

  function play() {
    const enemyMovementTimer = setInterval(alienMove, 800)
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 25000)
    const enemyShootTimer = setInterval(alienShoot, 1600)
  }

  // PAUSE BUTTON - doesn't fucking work!
  function pauseGame(enemyMovementTimer) {
    console.log('pause button')
    clearInterval(enemyMovementTimer)
  }
  // ALIEN MOVE --------------------------------------------------------------

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
  function alienShoot() {
    //firingAlien = random from aliens array
    let firingAlien = aliens[Math.floor(Math.random()*aliens.length)]
    console.log(`alien ${firingAlien.rank} should fire from this ${firingAlien.position} position`)
    firingAlien.bombsAway()

    // console.log(`${firingAlien} this alien should fire`)
    // aliens.find(alien => alien.rank)
    //
    // const deadAliens = aliens.find(alien => alien.rank === parseInt(square.id)


    // const deadAliens = aliens.find(alien => alien.rank === parseInt(square.id))
  }



}


window.addEventListener('DOMContentLoaded', init)
