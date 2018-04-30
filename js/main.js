function scoreBoard(){
    var score = document.createElement("div");
    score.setAttribute("id", "scoreBoard");
    document.getElementById("mainMenu").appendChild(score);
    
    
    var table = document.createElement("table");
    table.setAttribute("id", "table");
    document.getElementById("scoreBoard").appendChild(table);

    for (var i=0; i < 10; i++){
        var n = document.createElement("tr");
        n.setAttribute("id", "row" + i);
        document.getElementById("table").appendChild(n);
    }

    var rowCount = 0;
    for (var m=0; m < i; m++){
            var r = document.createElement("td");
            var rowId = "row" + rowCount;
            document.getElementById(rowId).appendChild(r);
            var o = document.createElement("td");
            document.getElementById(rowId).appendChild(o);
            var p = document.createElement("p");
            r.appendChild(p);
            var q = document.createElement("p");
            o.appendChild(q);
            p.innerHTML = "Name" + rowCount;
            q.innerHTML = 100 - m * 10;
            rowCount++;
        }


    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("rule").style.visibility = "hidden";
    var back = document.createElement('button');
    back.setAttribute("onclick", "backScore()");
    back.setAttribute("id", "backScore");
    back.setAttribute("class", "backs");
    document.getElementById("mainMenu").appendChild(back);
    
}


function fillBoard() {
    var board = document.createElement("div");
    board.setAttribute("id", "board");
    document.getElementById("mainMenu").appendChild(board);

    for (var i = 0; i < 5; i++){
        var tempGroup = document.createElement("div");

        for (var n = 0; n < 5; n++){
            var temp = document.createElement("div");
            var color = Math.floor(Math.random() * 6);
            switch (color){
                case 0:
                    temp.style.backgroundColor = "yellow";
                    temp.setAttribute("class", "yellow");
                    break;
                case 1:
                    temp.style.backgroundColor = "red";
                    temp.setAttribute("class", "red");
                    break;
                case 2: 
                    temp.style.backgroundColor = "blue";
                    temp.setAttribute("class", "blue");
                    break;
                case 3: 
                    temp.style.backgroundColor = "purple";
                    temp.setAttribute("class", "purple");
                    break;
                case 4: 
                    temp.style.backgroundColor = "green";
                    temp.setAttribute("class", "green");
                    break;
                case 5:
                    temp.style.backgroundColor = "brown";
                    temp.setAttribute("class", "brown");
                    break;
            }
            temp.style.height = "50px";
            temp.style.width = "50px";
            temp.style.float = "left";
            temp.style.margin = "1px";
            temp.setAttribute("id", n + i * 5);
            document.getElementById("board").appendChild(temp);
        }
    }
    
    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("rule").style.visibility = "hidden";
    var back = document.createElement('button');
    back.setAttribute("onclick", "back()");
    back.setAttribute("class", "backs");
    back.setAttribute("id", "back");
    document.getElementById("mainMenu").appendChild(back);
}


function back(){
    document.getElementById("board").outerHTML = "";
    document.getElementById("back").outerHTML = "";
    document.getElementById("play").style.visibility = "visible";
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("rule").style.visibility = "visible";
}

function backScore(){
    document.getElementById("scoreBoard").outerHTML = "";
    document.getElementById("backScore").outerHTML = "";
    document.getElementById("play").style.visibility = "visible";
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("rule").style.visibility = "visible";
}

