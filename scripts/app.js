const width = 20
const squares = []
let player = null
const aliens = []
const bombs = []
// let alienIndex = 0
let movingRight = true
let alienCount = 0 // counts movement across grid width
const playerIndex = [] // will put player to bottom LHS of grid
const missilePosition = null
const bombPosition = null
const missiles = []
let currentScore = 0
let score = null


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
    // console.log('playerHit function')
    squares.forEach(square => {
      if(square.classList.contains('bomb') && square.classList.contains('player')) {
        console.log(square)
        this.lives -= 1
        // console.log(`player has ${this.lives} lives left`)
      }
    })
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
    checkHit()
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
    this.movingRight = true
    this.alienCount = alienCount
  }
  moveEnemy() {
    squares[this.position].classList.remove('alien')
    // squares[this.position].removeAttribute('id')
    if (movingRight) {
      this.position ++
      this.alienCount ++
    } else if (!movingRight) {
      this.position --
      this.alienCount --
    }
    squares[this.position].classList.add('alien')
    squares[this.position].id = this.rank
  }
  dropLine() {
    squares[this.position].classList.remove('alien')
    this.position += width
    movingRight = !movingRight
    squares[this.position].classList.add('alien')
    squares[this.position].id = this.rank
  }
  kaboom() {
    bombs.push(new Bombs(this.position))
  }
}


// BOMB LOGIC ----------------------------------------------------------------
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
    if (this.position >= width*width-width) {
      checkPlayerHit()
    }
  }
}

function checkPlayerHit() {
  squares.forEach(square => {
    if(square.classList.contains('bomb') && square.classList.contains('player')) {
      console.log('player hit, run playerHit function')
      player.playerHit()
    }
  })
}


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
  if (missileShouldFire) missiles.moveMissile()
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
  squares.forEach(square => {
    if(square.classList.contains('missile') && square.classList.contains('alien')) {
      console.log('hit')
      square.classList.remove('alien', 'missile')
      const deadAliens = aliens.find(alien => alien.rank === parseInt(square.id))
      deadAliens.alienhit = true
      updateScoreBoard()
    }
  })
}

function updateScoreBoard() {
  // const score = document.querySelector('#player-score')
  console.log('updateScoreBoard function')
  currentScore += 500
  console.log(`updateScoreBoard with new score of ${currentScore}`)
  console.log(score)
  score.innerHTML = currentScore
  // innerHTML
}


// CHECK HIT ON PLAYER ------------------------------------------------------

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

  aliens.push(new Alien(0, 1, null, true, false, 0))
  aliens.push(new Alien(1, 3, null, true, false, 0))
  aliens.push(new Alien(2, 5, null, true, false, 0))
  aliens.push(new Alien(3, 7, null, true, false, 0))
  //second line
  aliens.push(new Alien(4, width+0, null, true, false, 0))
  aliens.push(new Alien(5, width+2, null, true, false, 0))
  aliens.push(new Alien(6, width+4, null, true, false, 0))
  aliens.push(new Alien(7, width+6, null, true, false, 0))
  aliens.push(new Alien(8, width+8, null, true, false, 0))
  //third line
  aliens.push(new Alien(8, width*2+1, null, true, false, 0))
  aliens.push(new Alien(9, width*2+3, null, true, false, 0))
  aliens.push(new Alien(10, width*2+5, null, true, false, 0))
  aliens.push(new Alien(11, width*2+7, null, true, false, 0))
  // console.log(aliens)
  // console.log(aliens.find(alien => alien.rank === 0))
  player = new Player(width*width-width, false, true, 3, false)
  // console.log(player)

  // QUERY SELECTORS ---------------------------------------------------------
  livesleft = document.querySelector('#player-lives')
  score = document.querySelector('#score')
  const start = document.querySelector('#startBtn')
  const pause = document.querySelector('#pauseBtn')
  // EVENT LISTENERS
  window.addEventListener('keydown', handleKeyDown)
  start.addEventListener('click', play)
  pause.addEventListener('click', pauseGame)

  // ALIEN MOVEMENT & FIRE TIMER--------------------------------------------

  function play() {
    const enemyMovementTimer = setInterval(alienMove, 800)
    setTimeout(()=> {
      clearInterval(enemyMovementTimer)
    }, 30000)

    const enemyShootTimer = setInterval(alienShoot, 950)
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

    if (aliens[1].alienCount === 11) {
      aliens.forEach(alien => {
        if (!alien.alienhit) alien.dropLine()
        // alien.position += width+1
        // movingRight = !movingRight
      })
    } else if (aliens[1].alienCount === 0) {
      aliens.forEach(alien => {
        if (!alien.alienhit) alien.dropLine()
        // alien.position += width-1
        // movingRight = !movingRight
      })
    }
  }

  //ALIEN FIRE ALLOCATION ----------------------------------------------------
  function alienShoot() {
    //slects a random alien and calls kaboom(bomb drop) function
    if (!aliens.alienhit){
      aliens[Math.floor(Math.random()*aliens.length)].kaboom()
    }
  }

}


window.addEventListener('DOMContentLoaded', init)
