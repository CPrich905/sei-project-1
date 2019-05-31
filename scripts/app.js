const width = 5
const squares = []
let playerIndex = Math.floor(width * width / 2) // will put player to center of grid

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
    case 38:
      if (playerIndex - width >= 0) {
        playerIndex -= width
      }
      break
    case 40:
      if (playerIndex + width < width * width) {
        playerIndex += width
      }
      break
    default:
      playerShouldMove = false
  }
  if (playerShouldMove) movePlayer()
}

function init() {
  //  our code goes here
  // find parent grid div
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
  window.addEventListener('keydown', handleKeyDown)


}

window.addEventListener('DOMContentLoaded', init)
