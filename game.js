window.onload = function () {


  var canvas = document.getElementById("viewport");
  var context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight

  var drag = false;

  var level = {

    x: 250,
    y: 113,
    columns: 4,
    rows: 4,
    tileWidth: 40,
    tileHeight: 40,
    tiles: [],
    selectedTile: {
      selected: false,
      column: 0,
      row: 0
    }
  };

  var tileColors = ["red", "blue", "yellow", "red", "black"];

  function init() {

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseout", onMouseOut);

    for (var i = 0; i < level.columns; i++) {

      level.tiles[i] = [];
      for (var j = 0; j < level.rows; j++) {

        level.tiles[i][j] = {
          type: 0,
          shift: 0
        }
      }
    }

    newGame();
        
    main(0);
  }

  function main(tframe) {
    
    window.requestAnimationFrame(main);
    
    update(tframe);
    render();
}


  function createLevel() {

    var done = false;

    while (!done) {

      for (var i = 0; i < level.columns; i++) {

        for (var j = 0; j < level.rows; j++) {

          level.tiles[i][j].type = getRandomTile();
          
        }
      }
      
      resolveMatches();
      
      findMoves();
      
      if (moves.length > 0) {
        done = true;
      }

    }
  }
  
  
  function resolveMatches() {
    
    findMatches();
    
    while (matches.length > 0) {
      
      removeMatches();
      
      shiftTiles();
      
      findMatches();
    }
    
  }
  
  var matches = [];
  
  function findMatches() {
    
    matches = [];
    
    //horizontal matches
    
    for (var j=0; j<level.rows; j++) {
      
      var matchLength = 1;
      
      for (var i=0; i<level.columns; i++) {
        
        var checkMatch = false;
        
        if (i == level.columns-1) {
          
          checkMatch = true;
          
        } else {
          
          if (level.tiles[i][j].type == level.tiles[i+1][j].type &&
             level.tiles[i][j].type != -1) {
            
            matchLength += 1;
            
          } else {
            
            checkMatch = true;
            
          }
        }
        
        if (checkMatch) {
          
          if (matchLength >= 3) {
            
            matches.push({ column: i+1-matchLength, row: j, 
                        length: matchLength, horizontal: true });
          }

          matchLength = 1;
        }
      }
    }

    for (var i=0; i<level.columns; i++) {

      var matchLength = 1;

      for (var j=0; j<level.rows; j++) {

        var checkMatch = false;

        if (j == level.rows-1) {

          checkMatch = true;

        } else {

          if(level.tiles[i][j].type == level.tiles[i][j+1].type &&
            level.tiles[i][j].type != -1) {

              matchLength += 1;

            } else {

              checkMatch = true;
            }
        }

        if (checkMatch) {

          if (matchLength >= 3) {

            matches.push({column:i, row:j+1-matchLength,
                          length: matchLength, horizontal: false});
          }

          matchLength = 1;
        }
      }
    }
  }


  var moves = [];

  function swap(x1, y1, x2, y2) {

    var typeSwap = level.tiles[x1][y1].type;
    level.tiles[x1][y1].type = level.tiles[x2][y2].type;
    level.tiles[x2][y2].type = typeSwap;
  }

  function findMoves() {

    moves = [];

    for (var j=0; j<level.rows; j++) {

      for (var i=0; i<level.columns-1; i++) {

        swap(i, j, i+1, j);
        findMatches();
        swap(i, j, i+1, j);

        if (matches.length > 0) {

          moves.push({column1: i, row1: j, column2: i+1, row2: j});
        }
      }
    }

    for (var i=0; i<level.columns; i++) {

      for (var j=0; j<level.rows-1; j++) {

        swap(i, j, i, j+1);
        findMatches();
        swap(i, j, i, j+1);

        if (matches.length > 0) {

          moves.push({column1: i, row1: j, column2: i, row2: j+1});
        }
      }
    }

    matches = [];
  }

  function removeMatches() {

    loopMatches(function(index, column, row, match) { 

      level.tiles[column][row].type = -1
    });

    for (var i=0; i<level.columns; i++) {

      var shift = 0;

      for (var j=level.rows-1; j>=0; j--) {

        if (level.tiles[i][j].type = -1) {

          shift++;
          level.tiles[i][j].shift = 0;

        } else {

          level.tiles[i][j].shift = shift;
        }
      }
    }
  }

  function shiftTiles() {

    for (var i=0; i<level.columns; i++) {

      for (var j=level.rows-1; j>=0; j--) {

        if (level.tiles[i][j].tyoe == -1) {

          level.tiles[i][j] = getRandomTile();

        } else {

          var shift = level.tiles[i][j].shift;

          if (shift > 0) {

            swap(i, j, i, j+shift);
          }
        }

        level.tiles[i][j].shift = 0;
      }
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};
