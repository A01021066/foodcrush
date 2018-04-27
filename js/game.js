var Game = function(){

    this.init = function(row, column, base, ui){
        this.row = row;
        this.column = column;
        this.base = base;
        this.ui = ui;
        this.board = [];
        this.typeOfFood = 5;
    }

    this.fillBoard = function(row, column) {
        var board = document.createElement("div");
        for (var i = 0; i < 5; i++){
            for (var n = 0; n < 5; n++){
                var temp = document.createElement("div");
                temp.style.backgroundColor("yellow");
                document.getElementById('board').appendChild(temp);
            }
        }
        document.appendChild(board);
    }

    }