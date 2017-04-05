var side = 25;

$(document).ready(function() {
  
  snake = createSnake();
  food = generateFood();
  grid = createGrid();
  render();
  changeDirection();
  takeTurn();


  ////////////////////////////
  //  Function definitions  //
  ////////////////////////////

  // Returns a 2D array representing the grid
  function createGrid() {
    var grid = [];
    for (var i = 0; i < side; i++) {
      grid.push([]);
      for (var j = 0; j < side; j++) {
        grid[i].push(" ");
      }
    }
    grid[snake.position[0]][snake.position[1]] = "O"
    grid[food.position[0]][food.position[1]] = "F"
    return grid;
  };

  // Creates the snake object
  function createSnake() {
    var midpoint = Math.floor(side/2)
    var snake = {
      position: [midpoint, midpoint],
      direction: "r",
      coordinates: [[midpoint, midpoint]],
    }
    return snake;
  };

  // Renders the grid to html
  function render() {
    var gridRender = "<div class='grid'>"
    for (var row = 0; row < grid.length; row++) {
      gridRender += "<ul class='row row" + row + "'>"
      for (var col = 0; col < grid.length; col++) {
        if (grid[row][col] == "O") {
          gridRender += "<li class='col snake'></li>";
        }
        else {
          gridRender += "<li class='col'>" + grid[row][col] + "</li>";
        }
      }
      gridRender += "</ul>";
    }
    gridRender += "</div>";
    $(".container").html(gridRender)
  };

  // Changes the direction of the snake based on key input
  function changeDirection() {
    $(document).keydown(function(event) {
      switch(event.which) {
        case 37:
          snake.direction = "l"
          break;
        case 38:
          snake.direction = "u"
          break;
        case 39:
          snake.direction = "r"
          break;
        case 40:
          snake.direction = "d"
          break
        default: return;
      }
      event.preventDefault();
    });
  };

  // Moves the snake in direction by 1 square
  function moveSnake() {
    switch(snake.direction) {
      case "l":
        snake.position[1] -= 1;
        break;
      case "u":
        snake.position[0] -= 1;
        break;
      case "r":
        snake.position[1] += 1;
        break;
      case "d":
        snake.position[0] += 1;
        break;
      default: return;
    }
  };

  // Allows one 'turn' to take place
  function takeTurn() {
    setTimeout(function() {
      moveSnake();
      if (gameOver()) return gameOverScreen();
      grid = createGrid();
      render();
      takeTurn();
    }, 750);
  };

  // Creates the food object
  function generateFood() {
    var x = getRandomNumber("x");
    var y = getRandomNumber("y");
    while (x == snake.position[0] && y == snake.position[1]) {
      x = getRandomNumber("x");
    }
    var food = { position: [x, y] }
    return food;
  };

  // Returns a random number from 0 to side - 1 (inclusive)
  function getRandomNumber(axis) {
    number = -1;
    while (number < 0 || side <= number) {
      number = Math.floor(Math.random() * (side));
    }
    return number; 
  };

  // Grows snake if it eats the food
  function eatFood() {
  }

  // Returns true if the game is over
  function gameOver() {
    if (snake.position[0] < 0 || snake.position[0] >= side ||
        snake.position[1] < 0 || snake.position[1] >= side) {
      return true;
    }
  };

  // Displays game over screen
  function gameOverScreen() {
    alert("Game over!");
  };

});
