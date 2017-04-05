var side = 25;

$(document).ready(function() {
  
  var snake = createSnake();
  var food = generateFood();
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
    grid[food.position[0]][food.position[1]] = "F"
    for (var i = 0; i < snake.coordinates.length; i++) {
      grid[snake.coordinates[i][0]][snake.coordinates[i][1]] = "O";
    }
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

  // Creates the food object
  function generateFood() {
    var x = getRandomNumber("x");
    var y = getRandomNumber("y");
    while (x === snake.position[0] && y === snake.position[1]) {
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
        // moveSnakeBody(0, "-");
        break;
      case "r":
        snake.position[1] += 1;
        // moveSnakeBody(1, "+");
        break;
      case "d":
        snake.position[0] += 1;
        // moveSnakeBody(0, "+");
        break;
      default: return;
    }
    snake.coordinates.unshift([snake.position[0], snake.position[1]]);
    snake.coordinates.pop();
  };

  // Returns true if the snake's head eats the food
  function eatFood() {
    if (snake.position[0] === food.position[0] &&
        snake.position[1] === food.position[1]) { 
      return true;
    }
  };

  // Grows snake by 1 unit
  function growSnake() {
    var snakeBody = snake.coordinates
    var snakeEnd = snakeBody[snakeBody.length - 1]
    console.log(snake.position);
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

    snake.coordinates.unshift([snake.position[0], snake.position[1]]);
  };

  // Returns true if the game is over
  function gameOver() {
    return snakeHitWall() || snakeHitSelf();
  };

  // Returns true if the snake has hit the wall
  function snakeHitWall() {
    if (snake.position[0] < 0 || snake.position[0] >= side ||
        snake.position[1] < 0 || snake.position[1] >= side) {
      return true;
    }
  };

  // Returns true if the snake has hit itself
  function snakeHitSelf() {
    for (var i = 1; i < snake.coordinates.length; i++) {
      if (snake.position[0] === snake.coordinates[i][0] &&
          snake.position[1] === snake.coordinates[i][1]) {
        return true;
      }
    }
    return false;
  };

  // Displays game over screen
  function gameOverScreen() {
    alert("Game over!");
  };

  // Allows one 'turn' to take place
  function takeTurn() {
    setTimeout(function() {
      if (eatFood()) {
        food = generateFood();
        growSnake();
      }
      moveSnake();
      if (gameOver()) return gameOverScreen();
      grid = createGrid();
      render();
      takeTurn();
    }, 150);
  };

});
