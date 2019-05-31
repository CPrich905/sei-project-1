const width = 10
const squares = []
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid
let alienIndex = 0 // starts alien in top LHS
let alienCount = 0 //
let movingRight = true


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
  document.getElementById('startBtn').addEventListener('click', alienMove)

  // ALIEN MOVEMENT

  setInterval(alienMove, 1000)
  function alienMove() {
    let alienShouldMove = true
    if (alienCount < 9) {
      alienShouldMove = true
    } else if (alienCount >= 10) {
      alienShouldMove = false
    }

    // if the count is less than 9 move to the right
    if (alienCount < 9) {
      if(movingRight) {
        alienIndex++
      } else {
        alienIndex--
      }
      // alienIndex ++
      // alienCount ++
      // squares.forEach(square => square.classList.remove('alien'))
      // squares[alienIndex].classList.add('alien')
      // console.log(`alien moving right count is ${alienCount}`)
    } else if (alienCount === 9) {
      console.log('drop it like its hot')
      alienIndex += width
      alienCount = 0
      movingRight = !movingRight
      console.log(`alien is dropping one row count is ${alienCount}`)
    } else if (!alienShouldMove) {
      console.log('ahhh')
      alienIndex --
      alienCount --
      squares.forEach(square => square.classList.remove('alien'))
      squares[alienIndex].classList.add('alien')
      console.log(`alien moving left count is ${alienCount}`)
    }
    // when the count reaches 9, drop one row and start moving left

    // when the count reaches 0, drop one row and start moving right

  }

}



window.addEventListener('DOMContentLoaded', init)
