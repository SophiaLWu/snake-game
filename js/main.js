$(document).ready(function() {
  var grid = [];
  for (var i = 0; i < 40; i++) {
    grid.push([]);
    for (var j = 0; j < 40; j++) {
      grid[i].push(" ");
    }
  }

  grid[20][20] = "O"

  function render() {
    $(".container").append("<div class='grid'</div>");
    for (var row = 0; row < grid.length; row++) {
      $(".grid").append("<ul class='row row" + row + "'></ul>");
      for (var col = 0; col < grid.length; col++) {
        $(".row" + row).append("<li class='col'>" + grid[row][col] + "</li>");
      }
    }
  };

  render();
});