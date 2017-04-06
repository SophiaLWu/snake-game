

$(document).ready(function() {
  $(".game-over").hide();
  var timer;
  var pause = false;
  var restart = false;
  var side = 20;
  var score = 0;
  var foodPoints = 1;
  var speed = 200;
  var snake = createSnake();
  var food = generateFood();
  changeDirection();
  gameSettings();
  takeTurn();

  ////////////////////////////
  //  Function definitions  //
  ////////////////////////////

  // Start new game
  function init() {
    pause = false;
    restart = false;
    score = 0;
    foodPoints = 1;
    speed = 200;
    snake = createSnake();
    food = generateFood();
  }

  // Returns a 2D array representing the grid
  function createGrid() {
    var grid = [];
    for (var i = 0; i < side; i++) {
      grid.push([]);
      for (var j = 0; j < side; j++) {
        grid[i].push(" ");
      }
    }
    grid[food.position[0]][food.position[1]] = "food";
    grid[snake.position[0]][snake.position[1]] = "head";
    for (var i = 1; i < snake.coordinates.length; i++) {
      grid[snake.coordinates[i][0]][snake.coordinates[i][1]] = "body";
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
    while (foodOnSnake(x, y)) {
      x = getRandomNumber("x");
      y = getRandomNumber("y");
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

  // Returns true if the given food coordinates are on the snake
  function foodOnSnake(x, y) {
    for (var i = 0; i < snake.coordinates.length; i++) {
      if (snake.coordinates[i][0] == x || snake.coordinates[i][1] == y) {
        return true;
      }
    }
    return false;
  }

  // Renders grid and score to html
  function render() {
    var gridRender = ""
    for (var row = 0; row < grid.length; row++) {
      gridRender += "<ul class='row row" + row + "'>"
      for (var col = 0; col < grid.length; col++) {
        if (grid[row][col] == "body") {
          gridRender += "<li class='col snake'></li>";
        }
        else if (grid[row][col] == "head") {
          gridRender += "<li class='col snake snake-head'><img src='images/snake-eyes.png'></li>";
        }
        else if (grid[row][col] == "food") {
          gridRender += "<li class='col food'><img src='images/apple.jpg'></li>";
        }
        else {
          gridRender += "<li class='col'>" + grid[row][col] + "</li>";
        }
      }
      gridRender += "</ul>";
    }
    $(".grid").html(gridRender);
    $(".score").html("Score: " + score);
  };

  // Changes the direction of the snake based on key input
  function changeDirection() {
    $(document).keydown(function(event) {
      if (!pause) {
        var originalDirection = snake.direction
        var snakeLength = snake.coordinates.length
        switch(event.which) {
          case 37:
            if (snakeLength == 1 || originalDirection != "r") {
              snake.direction = "l";
            }
            break;
          case 38:
            if (snakeLength == 1 || originalDirection != "d") {
              snake.direction = "u";
            }
            break;
          case 39:
            if (snakeLength == 1 || originalDirection != "l") {
              snake.direction = "r";
            }
            break;
          case 40:
            if (snakeLength == 1 || originalDirection != "u") {
              snake.direction = "d";
            }
            break
          default: return;
        }
        event.preventDefault();
      }
    });
  };

  // Given a new position for head, moves the snake in that direction by 1
  function moveSnake(position) {
    snake.position = position
    snake.coordinates.unshift([snake.position[0], snake.position[1]]);
    snake.coordinates.pop();
  };

  // Generates the new snake's head position based on the snake's direction
  function newMove() {
    switch(snake.direction) {
      case "l":
        return [snake.position[0], snake.position[1] - 1];
        break;
      case "u":
        return [snake.position[0] - 1, snake.position[1]];
        break;
      case "r":
        return [snake.position[0], snake.position[1] + 1];
        break;
      case "d":
        return [snake.position[0] + 1, snake.position[1]];
        break;
      default: return [];
    }
  }

  // Returns true if the snake's head eats the food
  function eatFood() {
    if (snake.position[0] === food.position[0] &&
        snake.position[1] === food.position[1]) { 
      return true;
    }
  };

  // Allows settings to change if food is eaten
  function eatFoodSettings() {
    console.log('eat');
    score += foodPoints;
    foodPoints += 1;
    food = generateFood();
    growSnake();
    if (speed > 5) speed -= 8;
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
        break;r
      case "d":
        snake.position[0] += 1;
        break;
      default: return;
    }
    snake.coordinates.unshift([snake.position[0], snake.position[1]]);
  };

  // Returns true if the game is over
  function gameOver(position) {
    return snakeHitWall(position) || snakeHitSelf(position);
  };

  // Returns true if the snake has hit the wall
  function snakeHitWall(position) {
    if (position[0] < 0 || position[0] >= side ||
        position[1] < 0 || position[1] >= side) {
      return true;
    }
  };

  // Returns true if the snake has hit itself
  function snakeHitSelf(position) {
    for (var i = 1; i < snake.coordinates.length; i++) {
      if (position[0] === snake.coordinates[i][0] &&
          position[1] === snake.coordinates[i][1]) {
        return true;
      }
    }
    return false;
  };

  // Displays game over screen
  function gameOverScreen() {
    $(".final-score").html(score);
    $(".game-over").fadeIn(400);
  };

  // Changes the pause or restart variables based on keyboard input
  function gameSettings() {
    $(document).keydown(function(event) {
      switch(event.which) {
        case 80:
          pause = !pause;
          break;
        case 82:
          restart = true;
          break;
        default: return;
      }
      event.preventDefault();
    });
  };

  // Allows one 'turn' to take place
  function takeTurn() {
    timer = setTimeout(function() {
      console.log(speed);
      if (restart) {
        init();
      }
      else if (!restart && !pause) {
        if (eatFood()) eatFoodSettings();
        var newPosition = newMove();
        if (gameOver(newPosition)) {
          gameOverScreen();
          playAgain();
          return;
        }
        moveSnake(newPosition);
        grid = createGrid();
        render();
      }
      takeTurn();
    }, speed);
  };

  // Starts game again if player clicks 'play again?'
  function playAgain() {
    $(".play-again").on("click", function() {
      $(".game-over").fadeOut(400);
      restart = true;
      clearTimeout(timer);
      takeTurn();
    });
  };

});
