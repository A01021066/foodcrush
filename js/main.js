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

    board.style.position = "relative";
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
            


            $(temp).css({top:i*50, left:n*50, width:50, height: 50, position:'absolute', display:'inline-block'});
            temp.setAttribute("id", n + i * 5);
            temp.setAttribute('data-id', n + i * 5);
            $(temp).click(function (){
                var thisId = this.id;
                var thisItem = document.getElementById(thisId);
                removeItem(thisItem);
            });
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

function removeItem(e){
    upperItemDrop(e);
    e.remove(); 
}



function upperItemDrop(e){
    //get the upper item assign it to = upper
    

    var thisId = e.id;
    var upperId = thisId - 5;
    console.log(upperId);
    var upperItem = document.getElementById(upperId);
    console.log(upperItem);
    var thisPos = $(e).position();

    //x = $(this).position().left
    var thisX = thisPos.left;
    //y = $(this).position().top
    var thisY = thisPos.top;
    //upper.moveItem(x, y, id);
    moveItem(upperItem, thisX, thisY, thisId);
}

function moveItem(e, x, y, id){
    $(e).animate({left: x,
                  top: y});
    console.log(e);
    e.setAttribute('id', id);
}

function swapItem(a, b){
    //var aPos = $(a).position();
    //var bPos = $(b).position();
    //a.moveItem(bPos.X, bPos.Y, b.attr('id'));
    //b.moveItem(aPos.X, aPos.Y, b.attr('id'));
}

function aaa(e){
    $(e).somethingelse();
}

function aaa(){
    this.somethingelse();
}

