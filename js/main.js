var height = $(document).height();
var width = $(document).width();
var scoreBack;
var scoreBoard;
var gameBack;
var menu;
var loginName;
var loginStatus;


var foods;
var selectedFood = null;
var selectedFoodStartPos;
var selectedFoodTween;
var tempShiftedFood = null;
var allowInput;
var hoveredFood;


var game = new Phaser.Game(width, height, Phaser.AUTO);

var GameState = {
    preload: function () {
        this.load.image('cheese', 'img/icon/cheese.png');
        this.load.image('buns', 'img/icon/buns.png');
        this.load.image('lettuce', 'img/icon/lettuce.png');
        this.load.image('ketchup', 'img/icon/ketchup.png');
        this.load.image('patty', 'img/icon/patty.png');
        this.load.image('pickle', 'img/icon/pickle.png');
        this.load.spritesheet('burger', 'img/icon/hamburger.png', 50, 50);
        this.load.image('background', 'img/background.png');
        this.load.image('start', 'img/button/start.png');
        this.load.image('highscore', 'img/button/highscores.png');
        this.load.image('back', 'img/button/back.png');
        this.load.image('fblogin', 'img/button/fblogin.png');
        this.load.image('fblogout', 'img/button/fblogout.png');
        this.load.image('submit', 'img/button/submit.png');
    },

    create: function () {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(100);
        game.plugins.add(PhaserInput.Plugin);

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    },

    update: function () {

    }
};

function createNamePrompt() {
    menu = game.add.group();
    loginStatus = game.make.text(10, 10, "Not Logged In.", { font: "12px Arial", fill: "#000" });
    menu.add(loginStatus);

    var message = game.make.text(game.world.centerX - 95, game.world.centerY - 250, "Please enter a username", { font: "bold 20px Arial", fill: "#000" });
    menu.add(message);

    var nameField = game.add.inputField(game.world.centerX - 95, game.world.centerY - 210, {
        font: '18px Arial',
        fill: '#000',
        padding: 8,
        width: 190,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        placeHolder: 'ex: John Smith',
        max: 20,
        type: PhaserInput.InputType.text
    });
    menu.add(nameField);

    function nameSubmit() {
        if (nameField.value != "" && nameField.value != null) {
            console.log("Logged in as: " + nameField.value);
            loginName = nameField.value;
            menu.destroy();
            createMenu();
        }
    }

    var submitButton = game.make.button(game.world.centerX + 130, game.world.centerY - 210, 'submit', nameSubmit, this, 2, 1, 0);
    menu.add(submitButton);

    var loginButton = game.make.button(game.world.centerX - 95, game.world.centerY - 150, 'fblogin', loginFB, this, 2, 1, 0);
    menu.add(loginButton);
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        FB.api('/me', function (response) {
            loginName = response.name;
        });
        menu.destroy();
        createMenu();
    } else {
        menu.destroy();
        createNamePrompt();
    }
}

function loginFB() {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                loginName = response.name;
            });
            menu.destroy();
            createMenu();
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
}

function logoutFB() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            FB.logout(function (success) {
                if (success.authResponse) {
                    console.log('Successfully logged out.');
                    loginName = "";
                    menu.destroy();
                    createNamePrompt();
                } else {
                    console.log('Logout unsuccessful.');
                }
            });
        } else {
            console.log('Successfully logged out.');
            loginName = "";
            menu.destroy();
            createNamePrompt();
        }
    });
}

function createMenu() {
    menu = game.add.group();
    loginStatus = game.make.text(10, 10, "Logged in as: " + loginName, { font: "12px Arial", fill: "#000" });
    menu.add(loginStatus);

    var start = game.make.button(game.world.centerX - 95, game.world.centerY - 200, 'start', startToPlay, this, 2, 1, 0);
    menu.add(start);

    var highscore = game.make.button(game.world.centerX - 95, game.world.centerY - 100, 'highscore', scoreboard, this, 2, 1, 0);
    menu.add(highscore);

    var logoutButton = game.make.button(game.world.centerX - 170, game.world.centerY, 'fblogout', logoutFB, this, 2, 1, 0);
    menu.add(logoutButton);
}



function startToPlay() {
    //console.log('creating level');
    menu.destroy();
    gameBack = game.add.group();
    loginStatus = game.make.text(10, 10, "Logged in as: " + loginName, { font: "12px Arial", fill: "#000" });
    gameBack.add(loginStatus);
    var gameEnd = game.make.button(game.world.centerX - 95, game.world.centerY + 250, 'back', endGame, this, 2, 1);
    gameBack.add(gameEnd);

    createLevel();

    //game.input.addMoveCallBack(slideFood, this);


}

function endGame() {
    gameBack.destroy();
    foods.destroy();
    createMenu();
}

function scoreboard() {
    //console.log('showing leader board');
    menu.destroy();
    scoreBoard = game.add.group();
    loginStatus = game.make.text(10, 10, "Logged in as: " + loginName, { font: "12px Arial", fill: "#000" });
    scoreBoard.add(loginStatus);

    buildTable();

    scoreBack = game.add.group();
    var scoreEnd = game.make.button(game.world.centerX - 95, game.world.centerY + 250, 'back', endScore, this, 2, 1);
    scoreBack.add(scoreEnd);
}

function buildTable() {
    $.ajax({
        url: "./php/gethighscores.php",
        dataType: "json",
        type: "GET",
        data: { output: 'json' },
        success: function (data) {

            console.log(data);
            var tstyle = { font: "12px Arial", fill: "#000" };
            var hstyle = { font: "bold 20px Arial", fill: "#000" };
            var header = game.make.text(game.world.centerX - 80, game.world.centerY - 280, "High Scores", hstyle);
            scoreBoard.add(header);
            var yShift = 0;

            for (var key in data["score"]) {
                yShift += 20;
                var xFlip = 1;
                for (var value in data["score"][key]) {
                    var newscore = game.make.text(game.world.centerX - 80 * xFlip, game.world.centerY - 250 + yShift, data["score"][key][value], tstyle);
                    scoreBoard.add(newscore);
                    xFlip = -0.9;
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var hstyle = { font: "bold 20px Arial", fill: "#000" };
            scoreBoard.add(game.make.text(game.world.centerX - 80, game.world.centerY - 250, textStatus + " " + errorThrown + jqXHR.responseText, hstyle));
        }
    });
}

function endScore() {
    scoreBoard.destroy();
    scoreBack.destroy();
    createMenu();

}

function createLevel() {
    foods = game.add.group();

    foods.x = game.world.centerX - 155;
    foods.y = game.world.centerY - 250;
    for (var i = 0; i < 6; i++) {
        for (var n = 0; n < 8; n++) {
            var food = foods.create(i * 52, n * 52, 'burger');
            food.inputEnabled = true;
            food.events.onInputDown.add(selectFood, this);
            food.events.onInputUp.add(releaseFood, this);
            food.events.onInputOver.add(returnHover, this);

            food.pixelPerfectOver = true;
            labelFood(food);

            setFoodPos(food, i, n);

        }
        allowInput = false;
        selectedFoodStartPos = { x: 0, y: 0 };
        seletecFood = null;
        tempShiftedFood = null;
    }

    allowInput = false;

    selectedFood = null;
    tempShiftedFood = null;
}

function returnHover(food) {
    hoveredFood = food;
    console.log(hoveredFood);
    return;
}

function selectFood(food) {
    selectedFood = food;
    selectedFoodStartPos.x = food.posX;
    selectedFoodStartPos.y = food.posY;
    //console.log('food selected');
    //console.log(selectedFoodStartPos);
    //console.log(food.posX);
    //console.log(food.posY);
    //console.log(food.id);
    //console.log(selectedFood);
}

function releaseFood() {
    /*if (tempShiftedFood === null){
        selectedFood = null;
        return;
    }
    
    var haveMatch = checkMatches(selectedFood);
    haveMatch = checkMatches(tempShiftedFood) || haveMatch;
    
    if (!haveMatch){
        selectedFood = null;
        tempShiftedFood = null;
        return;
    }
    
    removeFoods();
    var dropFoodDuration = dropFoods();
    
    game.time.events.add(dropFoodDuration * 100, refillBoard);
    allowInput = false;
    selectedFood = null;
    tempShiftedFood = null;*/

    console.log(hoveredFood);
    swapFood(selectedFood, hoveredFood);

    //console.log('food released');
}

function labelFood(food) {
    var label = Math.floor(Math.random() * 6);
    switch (label) {
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

function setFoodPos(food, posX, posY) {
    food.posX = posX;
    food.posY = posY;
    food.id = calcFoodId(posX, posY);

}

function updateFoodPos(food, x, y) {
    food.x = x;
    food.y = y;
}


function calcFoodId(posX, posY) {
    var id = (posY * 6) + posX;
    return id;
}

function swapFood(food1, food2) {
    var food1x = food1.x;
    var food1y = food1.y;
    var food2x = food2.x;
    var food2y = food2.y;
    var food1PosX = food1.posX;
    var food1PosY = food1.posY;
    var food2PosX = food2.posX;
    var food2PosY = food2.posY;

    if (canMoveHere(food1PosX, food1PosY, food2PosX, food2PosY)) {
        setFoodPos(food1, food2PosX, food2PosY);
        setFoodPos(food2, food1PosX, food1PosY);
        updateFoodPos(food2, food1x, food1y);

        updateFoodPos(food1, food2x, food2y);
    }
}

//the hovered object that gets passed to swapFoods will "lose" its hoverable property unless the user hovers onto it, then hovers to something else, then hover back.


function canMoveHere(fromPosX, fromPosY, toPosX, toPosY) {
    if (toPosX < 0 || toPosX >= 6 || toPosY < 0 || toPosY >= 8) {
        return false;
    }

    if (fromPosX === toPosX && fromPosY >= toPosY - 1 && fromPosY <= toPosY + 1) {
        return true;
    }

    if (fromPosY === toPosY && fromPosX >= toPosX - 1 && fromPosX <= toPosX + 1) {
        return true;
    }

    return false;
}


game.state.add('GameState', GameState);
game.state.start('GameState');

