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
            assignColor(temp, color);
            $(temp).css({top:i*50, left:n*50, width:50, height: 50, position:'absolute', display:'inline-block'});
            temp.setAttribute("id", n + i * 5);
            temp.setAttribute('data-id', n + i * 5);
            $(temp).click(function (){
                var thisId = this.id;

                removeItem(thisId);
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
    var person = prompt("Please Enter Your Name", "AAA");
    var score = Math.floor(Math.random()* 60);
    if (person != null) {
        //taylor's part. This is where you encode 
        //the prompt data which is the name of the user to our database
        //the score varaible generates a random number for score.
        document.getElementById("test").innerHTML = "Hello" + person;
    }
}

function assignColor(temp, color){
    switch (color){
        case 0:
            temp.style.backgroundImage = 'url(../img/icon/' + 'buns' + '.png)';
            temp.setAttribute("class", "buns");
            break;
        case 1:
            temp.style.backgroundImage = 'url(../img/icon/' + 'patty' + '.png)';
            temp.setAttribute("class", "patty");
            break;
        case 2: 
        temp.style.backgroundImage = 'url(../img/icon/' + 'ketchup' + '.png)';
            temp.setAttribute("class", "ketchup");
            break;
        case 3: 
        temp.style.backgroundImage = 'url(../img/icon/' + 'cheese' + '.png)';
            temp.setAttribute("class", "cheese");
            break;
        case 4: 
            temp.style.backgroundImage = 'url(../img/icon/' + 'lettuce' + '.png)';
            temp.setAttribute("class", "lettuce");
            break;
        case 5:
            temp.style.backgroundImage = 'url(../img/icon/' + 'pickle' + '.png)';
            temp.setAttribute("class", "pickle");
            break;
    }
}

function removeItem(e){
    var item = document.getElementById(e);
    upperItemDrop(e);
    item.remove(); 
}

function upperItemDrop(e){
    //get the upper item assign it to = upper

    var thisItem = document.getElementById(e);
    var upperId = e - 5;
    console.log(upperId);
    if (upperId >= 0){
        var upperItem = document.getElementById(upperId);
        console.log(upperItem);
        var thisPos = $(thisItem).position();

        //x = $(this).position().left
        var thisX = thisPos.left;
        //y = $(this).position().top
        var thisY = thisPos.top;
        //upper.moveItem(x, y, id);
        moveItem(upperItem, thisX, thisY, e);
        checkUpperSpace(e);
    }

    else if (upperId < 0) {
        var newItem = generateNewItem(e);
        checkUpperSpace(e);

    }
    
}


function generateNewItem(x){
    var newItem = document.createElement('div');
    var color = Math.floor(Math.random() * 6);
    newItem.setAttribute('id', x);
    newItem.setAttribute('data-id', x);
    assignColor(newItem, color);
    $(newItem).click(function (){
        var thisId = this.id;
        removeItem(thisId);
    });
    $(newItem).css({top: -50, left: x*50, width: 50, height: 50, opacity: 0, position: 'absolute', display: 'inline-block'});
    board.appendChild(newItem);
    moveItem(newItem, x*50, 0, x);
}



function moveItem(e, x, y, id){
    $(e).animate({left: x,
                  top: y,
                  visibility: 'visible',
                  opacity: 1.0});
    console.log(e);
    e.setAttribute('id', id);
    e.setAttribute('data-id', id);
}

function swapItem(a, b){
    //var aPos = $(a).position();
    //var bPos = $(b).position();
    //a.moveItem(bPos.X, bPos.Y, b.attr('id'));
    //b.moveItem(aPos.X, aPos.Y, b.attr('id'));
}

function checkUpperSpace(e){




}





