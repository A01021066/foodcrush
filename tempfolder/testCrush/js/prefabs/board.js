var Match3 = Match3 || {};

Match3.Board = function(state, rows, cols, blockVariations) {

    this.state = state;
    this.rows = rows;
    this.cols = cols;
    this.blockVariations = blockVariations;

    this.grid = [];

    var i, l;

    for(i = 0; i < rows; i++) {

        this.grid.push([]);

        for(j = 0; j < cols; j++) {

            this.grid[i].push(0);
        }
    }

    console.log(this.grid);

    this.reserveGrid = [];

    this.RESERVE_ROW = 5;

    for(i = 0; i < this.RESERVE_ROW; i++) {

        this.reserveGrid.push([]);

        for(j = 0; j < cols; j++) {

            this.reserveGrid[i].push(0);
        }
    }

    console.log(this.reserveGrid);

};

Match3.Board.prototype.populateGrid = function() {

    var i, l, variation;

    for(i = 0; i < this.rows; i++) {

        for(j = 0; j < this.cols; j++) {

            variation = Math.floor(Math.random() * this.blockVariations) + 1;
            this.grid[i][j] = variation;

        }
    }
};

Match3.Board.prototype.populateReserveGrid = function() {

    var i, l, variation;

    for(i = 0; i < this.RESERVE_ROW; i++) {

        for(j = 0; j < this.cols; j++) {

            variation = Math.floor(Math.random() * this.blockVariations) + 1;
            this.reserveGrid[i][j] = variation;

        }
    }
};