var height = $(document).height();
var width = $(document).width();
var scoreBack;
var gameBack;
var menu;
var gameTime;
var moveCount;


var foods;
var selectedFood;
var selectedFoodStartPos;
var hoveredFood;


var game = new Phaser.Game(width, height, Phaser.AUTO);


var GameState = {
    preload: function(){
       
        this.load.spritesheet('burger', 'img/icon/hamburger.png',50,50);
        this.load.image('background', 'img/background.png');
        this.load.image('start', 'img/button/start.png');
        this.load.image('highscore', 'img/button/highscores.png');
        this.load.image('back', 'img/button/back.png');
    },
    
    create: function(){
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(100);
        
        createMenu();
    },
    
    update: function(){

    }
    

};

    
function createMenu(){
        menu = game.add.group();
        var start = game.make.button(game.world.centerX - 95, game.world.centerY - 200, 'start', startToPlay, this, 2, 1, 0);
        menu.add(start);
    
        var highscore = game.make.button(game.world.centerX - 95, game.world.centerY - 100, 'highscore', scoreboard, this, 2, 1, 0);
        menu.add(highscore);
}



function startToPlay(){
    //console.log('creating level');
    menu.destroy();
    gameBack = game.add.group();
    var gameEnd = game.make.button(game.world.centerX - 95, game.world.centerY + 250, 'back', endGame, this, 2, 1);
    gameBack.add(gameEnd);
    
    createLevel();

    game.input.addMoveCallback(swapFood, this);
    
    
}

function endGame(){
    gameBack.destroy();
    foods.destroy();
    moveCount = 0;
    createMenu();

}

function scoreboard(){
    //console.log('showing leader board');
    menu.destroy();
    scoreBack = game.add.group();
    var scoreEnd = game.make.button(game.world.centerX - 95, game.world.centerY + 250, 'back', endScore, this, 2, 1);
    scoreBack.add(scoreEnd);
}

function endScore(){
    scoreBack.destroy();
    createMenu();

}

function rot(counter){

}

function createLevel(){
    foods = game.add.group();

    foods.x = game.world.centerX - 155;
    foods.y = game.world.centerY - 250;
    for (var i = 0; i < 6; i++){
        for (var n = 0; n < 8; n++){
            var food = foods.create(i * 52, n * 52, 'burger');
            food.inputEnabled = true;
            food.events.onInputDown.add(selectFood, this);
            food.events.onInputUp.add(releaseFood, this);
            food.events.onInputOver.add(returnHover, this);
            
            food.pixelPerfectOver = true;
            labelFood(food);

            setFoodPos(food, i, n);

        }
    }
    
    for (var i = 0; i < 48; i++){
        checkMatch(getFoodById(i));
    }

    for (var i = 0; i < 48; i++){
        refillFoodById(i);
    }

    selectedFoodStartPos = {x: 0, y: 0};
    moveCount = 0;
 
}

function refillFoodById(i){

    if (getFoodById(i) == null || !getFoodById(i).alive){
    var food = getFoodById(i);
    var foodPosX = food.posX;
    var foodPosY = food.posY;
    var x = food.x;
    var y = food.y;

    //console.log("destroying: ", food);
    
    if (!food.alive){
        var newFood = foods.create(foodPosX * 52, foodPosY * 52, 'burger');
        //console.log("creating: ", newFood);
        newFood.inputEnabled =true;
        newFood.events.onInputDown.add(selectFood, this);
        newFood.events.onInputUp.add(releaseFood, this);
        newFood.events.onInputOver.add(returnHover, this);
        newFood.pixelPerfectOver = true;
        labelFood(newFood);
        setFoodPos(newFood, foodPosX, foodPosY);
        updateFoodPos(newFood, x, y);
        food.destroy();
        checkMatch(newFood);
    }

    refillFoodById(i)}
}

function returnHover(food){
    hoveredFood = food;

    
}

function selectFood(food){
    selectedFood = food;
    selectedFoodStartPos.x = food.posX;
    selectedFoodStartPos.y = food.posY;

}

function releaseFood(){

    swapFood(selectedFood, hoveredFood);

}

function labelFood(food){
    var label = Math.floor(Math.random() * 6);
    switch (label){
        case 0:
            food.frame = 0;
            food.type = 0;
            break;
        case 1:
            food.frame = 1;
            food.type = 1
            break;
        case 2:
            food.frame = 2;
            food.type = 2;
            break;
        case 3:
            food.frame = 3;
            food.type = 3;
            break;
        case 4:
            food.frame = 4;
            food.type = 4;
            break;
        case 5:
            food.frame = 5;
            food.type = 5;
            break;
        case 6:
            food.frame = 6;
            food.type = 6;
            break;
            
    }
    
}

function setFoodPos(food, posX, posY){
    food.posX = posX;
    food.posY = posY;
    food.id = calcFoodId(posX, posY);
    
}

function updateFoodPos(food, x, y){
    food.x = x;
    food.y = y;
}


function calcFoodId(posX, posY){
    var id = (posY * 6) + posX;
    return id;
}

function swapFood(food1, food2) {

    var food1PosX = food1.posX;
    var food1PosY = food1.posY;
    var food2PosX = food2.posX;
    var food2PosY = food2.posY;

    
    if(canMoveHere(food1PosX, food1PosY, food2PosX, food2PosY)){
        swapFoodAnimation(food1, food2);
        setFoodPos(food1, food2PosX, food2PosY);
        setFoodPos(food2, food1PosX, food1PosY);
        moveCount++;

    }
}

function swapFoodAnimation(food1, food2){
    var food1x = food1.x;
    var food1y = food1.y;
    var food2x = food2.x;
    var food2y = food2.y;
    var food1PosX = food1.posX;
    var food1PosY = food1.posY;
    var food2PosX = food2.posX;
    var food2PosY = food2.posY;
    
    
    
    var animation1 = game.add.tween(food1).to({x: food2x, y: food2y}, 200, Phaser.Easing.Quadratic.InOut, true);
    var animation2 = game.add.tween(food2).to({x: food1x, y: food1y}, 200, Phaser.Easing.Quadratic.InOut, true);
    
 
    
    animation1.onComplete.add(onComplete, this)
}

function onComplete(){
    checkMatch(hoveredFood);
    checkMatch(selectedFood);
}

//the hovered object that gets passed to swapFoods will "lose" its hoverable property unless the user hovers onto it, then hovers to something else, then hover back.


function canMoveHere(fromPosX, fromPosY, toPosX, toPosY){
    if (toPosX < 0|| toPosX >= 6 || toPosY < 0 || toPosY >= 8){
        return false;
    }
    
    if (fromPosX === toPosX && fromPosY >= toPosY -1 && fromPosY <= toPosY +1){
        return true;
    }
    
    if (fromPosY === toPosY && fromPosX >= toPosX - 1 && fromPosX <= toPosX + 1){
        return true;
    }
    
    return false;
}

function getFood(posX, posY){
    return foods.iterate('id', calcFoodId(posX, posY), Phaser.Group.RETURN_CHILD);
}

function getFoodById(id){
    return foods.iterate('id', id, Phaser.Group.RETURN_CHILD);
}

function countSame(food, moveX, moveY){
    var horizontal = food.posX + moveX;
    var vertical = food.posY + moveY;
    var count = 0;
    while (horizontal >= 0 && vertical >= 0 && horizontal < 6 && vertical < 8 && food.type === getFood(horizontal, vertical).type){
        count++;
        horizontal += moveX;
        vertical += moveY;
    }
    return count;
}

function checkMatch(iteratorFood){
    
    
        var countUp = countSame(iteratorFood, 0, -1);

        var countDown = countSame(iteratorFood, 0, 1);
 
        var countLeft = countSame(iteratorFood, -1, 0);

        var countRight = countSame(iteratorFood, 1, 0);


        var countX = countLeft + countRight + 1;
        var countY = countUp + countDown + 1;

        if (countX >= 3){

            removeFood(iteratorFood.posX - countLeft, iteratorFood.posY, iteratorFood.posX + countRight, iteratorFood.posY);
        }

        if (countY >= 3){
            removeFood(iteratorFood.posX, iteratorFood.posY - countUp, iteratorFood.posX, iteratorFood.posY + countDown);
        }
        
}

function removeFood(fromX, fromY, toX, toY){
    fromX = Phaser.Math.clamp(fromX, 0, 5);
    fromY = Phaser.Math.clamp(fromY, 0, 7);
    toX = Phaser.Math.clamp(toX, 0, 5);
    toY = Phaser.Math.clamp(toY, 0, 7);
    
    for(var i = fromX; i <= toX; i++){
        for (var n = fromY; n <= toY; n++){
            var foodToRemove = getFood(i, n);
            foodToRemove.kill();
            foodToRemove.type = 55;
            if(moveCount == 0){
                refillFoodById(foodToRemove.id);
                //console.log("removing", foodToRemove);
            }
            else if(moveCount > 0){
                generateRandomFood(foodToRemove);
                console.log("creating new fOOD");
            }
            }
        }
    }



function generateRandomFood(originalFood){
    if (!originalFood.alive){
        var column = originalFood.x;
        var y = -52;
        newFood = foods.create(column, y, 'burger');
        newFood.inputEnabled =true;
        newFood.events.onInputDown.add(selectFood, this);
        newFood.events.onInputUp.add(releaseFood, this);
        newFood.events.onInputOver.add(returnHover, this);
        newFood.pixelPerfectOver = true;
        labelFood(newFood);

    }
}





game.state.add('GameState', GameState);
game.state.start('GameState');

