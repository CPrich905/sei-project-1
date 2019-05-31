const width = 10
const squares = []
let playerIndex = Math.floor(width * width - width) // will put player to bottom LHS of grid
let alienIndex = 0 // starts alien in top LHS

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


function init() {
  const grid = document.querySelector('.grid')
  console.log('grid')
  //for loop to fill grid with squares
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

  // setInterval(alienMove, 1000)
  // const stop = clearInterval(alienMove)
  //
  function alienMove() {
    let alienShouldMove = true
    console.log('alien should move')
    setTimeout(alienShouldMove, 6000)
    if (alienIndex % width < width-1) {
      alienIndex++
    } else if (alienIndex % width > 0) {
      alienIndex--
    } else {
      alienShouldMove = false
    }
    if (alienShouldMove) alienMove()
  }

}

window.addEventListener('DOMContentLoaded', init)
