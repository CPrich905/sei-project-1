const width = 10
const squares = []
let player = null
const aliens = []
const bombs = []
// let alienIndex = 0
let movingRight = true
let alienCount = 0 // counts movement across grid width
let playerIndex = [] // will put player to bottom LHS of grid
let missilePosition = null
let bombPosition = null
const missiles = []


// PLAYER CONSTRUCTION ---------------------------------------------------------
class Player {
  constructor(startingIndex, shoot, move, lives, hit) {
    this.playerIndex = startingIndex
    this.shoot = false
    this.move = false // change to true on startBtn?
    this.lives = 3
    this.hit = false
  }
  //PLAYER MOVEMENT
  movePlayer() {
    this.startingIndex = Math.floor(width * width - width)
    squares.forEach(square => square.classList.remove('player'))
    squares[this.playerIndex].classList.add('player')
  }
  //confirms player is hit - reduces life counter by 1
  playerHit() {
    this.lives -= 1
    console.log(`player has ${this.lives} lives left`)
    //if player lives < 3, window alert 'you lost, try again?'
  }
}

//MISSILE CONSTRUCTION - nice to have: put an ammo counter on this & limit number of fires
class Missile {
  constructor(missileIndex, shouldTrack) {
    this.missileIndex = missileIndex
    this.shouldTrack = shouldTrack
    this.fireMissile()
  }
  fireMissile () {
    squares[this.missileIndex].classList.add('missile')
    this.moveMissile()
    this.missileTimer = setInterval( () => this.moveMissile(), 600)
  }
  moveMissile() {
    squares[this.missileIndex].classList.remove('missile')
    this.missileIndex-= width
    if (this.missileIndex < 0) {
      clearInterval(this.missileTimer)
    } else {
      squares[this.missileIndex].classList.add('missile')
    }
  }
}

//ALIEN CONSTRUCTION -----------------------------------------------------------

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
}
// ALIEN SHOOT ----------------------------------------------------------------
class Bombs {
  constructor(position) {
    this.position = position
    this.bombsAway()
  }
  bombsAway() {
    squares[this.position].classList.add('bomb')
    this.bombDrops()
    this.fallTimer = setInterval( () => this.bombDrops(), 800)
  }
  bombDrops() {
    squares[this.position].classList.remove('bomb')
    this.position += width
    if (this.position > width*width) {
      clearInterval(this.fallTimer)
    } else {
      squares[this.position].classList.add('bomb')
    }
  }
  //   bombPosition = this.position
  //   // console.log('bombs away', bombPosition)
  //   squares[bombPosition+width].classList.add('bomb')
  //   const bombDropTimer = setInterval(this.bombFall, 400)
  //   setTimeout(()=> {
  //     clearInterval(bombDropTimer)
  //   }, 50000)
  // }
  // bombFall() {
  //   // console.log(`bombFall at ${bombPosition}`)
  //   squares[bombPosition].classList.remove('bomb')
  //   bombPosition += width
  //   squares[bombPosition].classList.add('bomb')
  //   if (squares[bombPosition].classList.contains('player')) {
  //     console.log('hit')
  //     player.playerHit()
  //   }
  // if (squares[bombPosition] && parseInt(squares.id) >= width*width-width) {
  //   console.log('bomb on bottom line')
  // }
}


// function confirmKill() {
//   console.log('you dead')
// }

function handleKeyDown(e) {
  let playerShouldMove = true
  let missileShouldFire = false
  switch(e.keyCode) {
    case 39: // right-arrow
      if (player.playerIndex % width < width-1) {
        player.playerIndex++
      }
      break
    case 37: // left-arow
      if (player.playerIndex % width > 0) {
        player.playerIndex--
      }
      break
    case 83: // fire (s-key)
      missiles.push(new Missile(player.playerIndex - width))
      break
    default:
      playerShouldMove = false
      missileShouldFire = false
  }
  if (playerShouldMove) player.movePlayer()
  if (missileShouldFire) missile.moveMissile()
}

//MISSILE MOVEMENT--------------------------------------------------------------
// function moveMissile() {
//   squares[missilePosition].classList.remove('missile')
//   missilePosition -= width
//   squares[missilePosition].classList.add('missile')
//   if (squares[missilePosition].classList.contains('alien')) {
//     checkHit()
//   }
// }
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
  // console.log(aliens)
  // console.log(aliens.find(alien => alien.rank === 0))
  player = new Player(width*width-width, false, true, 3, false)
  console.log(player)


  const start = document.querySelector('#startBtn')
  const pause = document.querySelector('#pauseBtn')
  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', play)
  pause.addEventListener('click', pauseGame)

  // ALIEN MOVEMENT & FIRE TIMER------------------------------------------------

  function play() {
    const enemyMovementTimer = setInterval(alienMove, 800)
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 25000)

    const enemyShootTimer = setInterval(alienShoot, 500)
    setTimeout(() => {
      clearInterval(enemyShootTimer)
    }, 2000)
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

  //ALIEN FIRE ALLOCATION ----------------------------------------------------
  function alienShoot() {
    //firingAlien = random from aliens array
    const firingAlien = aliens[Math.floor(Math.random()*aliens.length)]
    console.log(`alien ${firingAlien.rank} should fire from position ${firingAlien.position}`)

    // assigns bombPosition as the position of the alien, passes it to bomb array
    bombPosition = firingAlien.position
    // console.log(bombPosition)
    bombs.push(new Bombs(bombPosition))
  }

}


window.addEventListener('DOMContentLoaded', init)
