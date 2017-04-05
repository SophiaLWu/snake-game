
$(document).ready(function() {

  snake = createSnake();
  grid = createGrid(snake);
  render(grid);
  changeDirection(snake);
  timeout();


  // Function definitions

  function createGrid(snake) {
    var grid = [];
    for (var i = 0; i < 40; i++) {
      grid.push([]);
      for (var j = 0; j < 40; j++) {
        grid[i].push(" ");
      }
    }
    grid[snake.position[0]][snake.position[1]] = "O"
    return grid;
  };

  function createSnake() {
    var snake = {
      position: [20, 20],
      direction: "r",
      coordinates: [[20, 20]],
    }
    return snake
  };

  function render(grid) {
    var gridRender = "<div class='grid'>"
    // $(".container").append("<div class='grid'</div>");
    for (var row = 0; row < grid.length; row++) {
      gridRender += "<ul class='row row" + row + "'>"
      // $(".grid").append("<ul class='row row" + row + "'></ul>");
      for (var col = 0; col < grid.length; col++) {
        gridRender += "<li class='col'>" + grid[row][col] + "</li>";
        // $(".row" + row).append("<li class='col'>" + grid[row][col] + "</li>");
      }
      gridRender += "</ul>";
    }
    gridRender += "</div>";
    $(".container").html(gridRender)
  };

  function changeDirection(snake) {
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

  function moveSnake(grid, snake) {
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

  function timeout() {
    setTimeout(function() {
      moveSnake(grid, snake);
      grid = createGrid(snake);
      render(grid);
      timeout();
    }, 750);
  };

});
