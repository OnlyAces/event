// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  let startTime = new Date().getTime(); // Record start time
  let highlightedSquareIndex = 12; // Initially, the center square is highlighted

  function getTimeElapsed() {
    let currentTime = new Date().getTime();
    return currentTime - startTime;
  }

  // Setting up the footer content
  let footer = document.querySelector('footer');
  let currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  let keys = {
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  };

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square');

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div');
    document.querySelector('#grid').appendChild(row);
    row.classList.add('row');
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div');
      square.classList.add('square');
      row.appendChild(square);
      square.addEventListener('click', () => {
        highlightedSquareIndex = Array.from(square.parentElement.children).indexOf(square);
        highlightSquare(highlightedSquareIndex);
      });
    }
  }
  highlightSquare(highlightedSquareIndex); // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = [];
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25);
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt);
      }
    }
    return randomInts;
  }

  function highlightSquare(index) {
    // Remove highlighting from all squares
    getAllSquares().forEach(square => {
      square.classList.remove('targeted');
    });
    // Highlight the specified square
    getAllSquares()[index].classList.add('targeted');
  }

  function exterminateMosquito(index) {
    const square = getAllSquares()[index];
    const mosquito = square.querySelector('img');
    if (mosquito && mosquito.dataset.status === 'alive') {
      square.removeChild(mosquito);
      mosquito.dataset.status = 'exterminated';
    }
  }

  let allSquares = getAllSquares();
  generateRandomIntegers().forEach(randomInt => {
    let mosquito = document.createElement('img');
    mosquito.src = './mosquito.png';
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`;
    mosquito.dataset.status = 'alive';
    allSquares[randomInt].appendChild(mosquito);
  });

  document.addEventListener('keydown', evt => {
    switch (evt.key) {
      case keys.up:
        if (highlightedSquareIndex >= 5) {
          highlightedSquareIndex -= 5;
        }
        break;
      case keys.right:
        if ((highlightedSquareIndex + 1) % 5 !== 0) {
          highlightedSquareIndex++;
        }
        break;
      case keys.down:
        if (highlightedSquareIndex < 20) {
          highlightedSquareIndex += 5;
        }
        break;
      case keys.left:
        if (highlightedSquareIndex % 5 !== 0) {
          highlightedSquareIndex--;
        }
        break;
      case keys.space:
        exterminateMosquito(highlightedSquareIndex);
        break;
    }
    highlightSquare(highlightedSquareIndex);

    // Task 5 - End the game
    if (getTimeElapsed() >= 60000) {
      alert('Game Over! Your time is up.');
      document.removeEventListener('keydown', evt); // Remove the event listener to stop the game
    }
  });
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
