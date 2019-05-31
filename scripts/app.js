const width = 10
const squares = []
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid
let alienIndex = 0 // starts alien in top LHS
let alienCount = 0 // counts movement
let movingRight = true
class Alien {
  constructor(startingIndex, alienMovement, alienHit) {
    this.rank = []
    this.startingIndex = []
    this.alienMovement = true
    //this.alienHit = false
    //this.alienShoot = false
  }
}

const alienOne = new Alien(1, 0, false)
const alienTwo = new Alien(2, 1, false)
const alienThree = new Alien(3, 2, false)
const alienFour = new Alien(4, 3, false)
const alienFive = new Alien(5, 4, false)
const alienSix = new Alien(6, 5, false)

//PLAYER MOVEMENT
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

  squares[playerIndex].classList.add('player')
  squares[alienIndex].classList.add('alien')
  window.addEventListener('keydown', handleKeyDown)


  // ALIEN MOVEMENT

  function moveEnemy() {
    squares.forEach(square => square.classList.remove('alien'))
    squares[alienIndex].classList.add('alien')
  }


  const enemyMovementTimer = setInterval(alienMove, 500)
  setTimeout(()=> {
    clearInterval(enemyMovementTimer)
  }, 20000)


  function alienMove() {
    if (movingRight) {
      alienIndex ++
      moveEnemy()
      alienCount ++
      console.log('moving right')
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

    squares.forEach(square => square.classList.remove('alien'))
    squares[alienIndex].classList.add('alien')


    // if the count is less than 9 move to the right
    // if (alienCount < 9) {
    //   if(movingRight) {
    //     alienIndex++
    //     console.log(`moving right count: ${alienCount}`)
    //   } else {
    //     alienIndex--
    //     console.log(`moving left count: ${alienCount}`)
    //   }
    //   // alienIndex ++
    //   // alienCount ++
    //   // squares.forEach(square => square.classList.remove('alien'))
    //   // squares[alienIndex].classList.add('alien')
    //   // console.log(`alien moving right count is ${alienCount}`)
    // } else if (alienCount === 9) {
    //   console.log('drop it like its hot')
    //   alienIndex += width
    //   alienCount = 0
    //   movingRight = !movingRight
    //   console.log(`alien is dropping one row count is ${alienCount}`)
    // }
  }
}



window.addEventListener('DOMContentLoaded', init)
