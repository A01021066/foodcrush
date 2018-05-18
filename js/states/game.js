var Match3 = Match3 || {};

var menu;
var score;
var scoreBoard;
var scoreText;
var loginName;
var loginStatus;

Match3.GameState = {

  init: function () {
    this.NUM_ROWS = 8;
    this.NUM_COLS = 8;
    this.NUM_VARIATIONS = 6;
    this.BLOCK_SIZE = 50;
    this.ANIMATION_TIME = 250;

  },
  create: function () {
    //game background
    this.background = this.add.sprite(0, 0, 'background');

    //board model
    this.board = new Match3.Board(this, this.NUM_ROWS, this.NUM_COLS, this.NUM_VARIATIONS);
    this.board.consoleLog();
    Match3.game.plugins.add(PhaserInput.Plugin);

    //doesn't work on localhost
    /*FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
    });*/

    this.createNamePrompt();
    ding = this.sound.add('ding');


  },


  createBlock: function (x, y, data) {

    var block = this.blocks.getFirstExists(false);

    if (!block) {

      block = new Match3.Block(this, x, y, data);
      this.blocks.add(block);

    } else {

      block.reset(x, y, data);
    }

    return block;
  },

  drawBoard: function () {

    var i, j, block, square, x, y, data;

    this.blocks = this.add.group();
    this.score = 0;


    //black squares
    scoreText = this.add.text(this.world.centerX - 225, this.world.centerY - 275, "Score: 0", { font: '36px Arial', fill: 'black', align: 'left' });
    scoreText.anchor.setTo(0, 0);
    var squareBitmap = this.add.bitmapData(this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);
    squareBitmap.ctx.fillStyle = '#000';
    squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

    for (i = 0; i < this.NUM_ROWS; i++) {

      for (j = 0; j < this.NUM_COLS; j++) {

        x = 36 + j * (this.BLOCK_SIZE + 6);
        y = 150 + i * (this.BLOCK_SIZE + 6);

        square = this.add.sprite(x, y, squareBitmap);
        square.anchor.setTo(0.5);
        square.alpha = 0;

        this.createBlock(x, y, { asset: 'block' + this.board.grid[i][j], row: i, col: j });
      }
    }

    this.game.world.bringToTop(this.blocks);
  },

  getBlockFromIndex: function (position) {

    var foundBlock;

    this.blocks.forEachAlive(function (block) {

      if (block.row === position.row && block.col === position.col) {

        foundBlock = block;
      }
    }, this);

    return foundBlock;
  },

  dropBlock: function (sourceRow, targetRow, col) {

    var block = this.getBlockFromIndex({ row: sourceRow, col: col });

    var targetY = 150 + targetRow * (this.BLOCK_SIZE + 6);

    block.row = targetRow;

    var blockMovemet = this.game.add.tween(block);

    blockMovemet.to({ y: targetY }, this.ANIMATION_TIME);
    blockMovemet.start();
  },

  dropReserveBlock: function (sourceRow, targetRow, col) {

    var x = 36 + col * (this.BLOCK_SIZE + 6);
    var y = -(this.BLOCK_SIZE + 6) * this.board.RESERVE_ROW + sourceRow * (this.BLOCK_SIZE + 6);

    var block = this.createBlock(x, y, { asset: 'block' + this.board.grid[targetRow][col], row: targetRow, col: col });

    var targetY = 150 + targetRow * (this.BLOCK_SIZE + 6);

    var blockMovemet = this.game.add.tween(block);
    blockMovemet.to({ y: targetY }, this.ANIMATION_TIME);
    blockMovemet.start();
  },

  swapBlocks: function (block1, block2) {

    block1.scale.setTo(1);

    var block1Movement = this.game.add.tween(block1);
    block1Movement.to({ x: block2.x, y: block2.y }, this.ANIMATION_TIME);

    block1Movement.onComplete.add(function () {
      block1.rotting++;
      block1.frame = block1.rotting;
      block2.rotting++;
      block2.frame = block2.rotting;
      this.board.swap(block1, block2);


      var chains = this.board.findAllChains();

      if (chains.length > 0) {
        this.score += chains.length;
        console.log(this.score);
        this.updateBoard();
        this.clearSelection();
      } else {
        this.isReversingSwap = false;
        this.clearSelection();
      }
    }, this);

    block1Movement.start();

    var block2Movement = this.game.add.tween(block2);
    block2Movement.to({ x: block1.x, y: block1.y }, this.ANIMATION_TIME);
    block2Movement.start();

  },

  updateScore: function () {
    scoreText.setText('Score: ' + this.score);
  },

  pickBlock: function (block) {

    if (this.isBoardBlocked) {
      return;
    }

    if (!this.selectedBlock) {

      //highlight clicked block
      block.scale.setTo(1.5);

      this.selectedBlock = block;

    } else {

      this.targetBlock = block;

      if (this.board.checkAdjacent(this.selectedBlock, this.targetBlock)) {

        this.isBoardBlocked = true;

        this.swapBlocks(this.selectedBlock, this.targetBlock);

      } else {

        this.clearSelection();
      }
    }
  },

  clearSelection: function () {

    this.isBoardBlocked = false;
    this.selectedBlock = null;
    this.blocks.setAll('scale.x', 1);
    this.blocks.setAll('scale.y', 1);
  },

  updateBoard: function () {

    this.board.clearChains();
    this.board.updateGrid();

    //wait a bit to clear consecutive chains

    this.game.time.events.add(this.ANIMATION_TIME, function () {

      var chains = this.board.findAllChains();

      if (chains.length > 0) {
        this.updateBoard();
        this.score+= chains.length;

      } else {

        this.clearSelection();
      }

      this.updateScore();
    }, this);
  },

  createMenu: function () {
    menu = this.add.group();
    loginStatus = this.make.text(10, 10, "Logged in as: " + loginName, { font: "16px Arial", fill: "#000" });
    menu.add(loginStatus);

    var start = this.make.button(this.world.centerX - 95, this.world.centerY - 200, 'start', this.startToPlay, this, 2, 1, 0);
    menu.add(start);

    var highscore = this.make.button(this.world.centerX - 95, this.world.centerY - 100, 'highscore', this.scoreBoard, this, 2, 1, 0);
    menu.add(highscore);

    var logoutButton = this.make.button(this.world.centerX - 170, this.world.centerY, 'fblogout', this.logoutFB, this, 2, 1, 0);
    menu.add(logoutButton);
  },

  startToPlay: function () {
    menu.destroy();
    gameBack = this.add.group();
    loginStatus = this.make.text(10, 10, "Logged in as: " + loginName, { font: "16px Arial", fill: "#000" });
    gameBack.add(loginStatus);

    var gameEnd = this.make.button(this.world.centerX - 95, this.world.centerY + 250, 'back', this.endGame, this, 2, 1);
    gameBack.add(gameEnd);

    this.drawBoard();
  },

  endGame: function () {
    gameBack.destroy();
    this.blocks.destroy();
    scoreText.destroy();
    this.createMenu();
  },

  scoreBoard: function () {
    menu.destroy();
    scoreBoard = this.add.group();
    loginStatus = this.make.text(10, 10, "Logged in as: " + loginName, { font: "16px Arial", fill: "#000" });
    scoreBoard.add(loginStatus);

    this.buildTable();

    scoreBack = this.add.group();
    var scoreEnd = this.make.button(this.world.centerX - 95, this.world.centerY + 250, 'back', this.endScore, this, 2, 1);
    scoreBack.add(scoreEnd);
  },

  buildTable: function () {
    $.ajax({
      url: "./php/gethighscores.php",
      dataType: "json",
      type: "GET",
      data: { output: 'json' },
      success: function (data) {

        console.log(data);
        var tstyle = { font: "12px Arial", fill: "#000" };
        var hstyle = { font: "bold 20px Arial", fill: "#000" };
        var header = this.make.text(this.world.centerX - 80, this.world.centerY - 280, "High Scores", hstyle);
        scoreBoard.add(header);
        var yShift = 0;

        for (var key in data["score"]) {
          yShift += 20;
          var xFlip = 1;
          for (var value in data["score"][key]) {
            var newscore = this.make.text(this.world.centerX - 80 * xFlip, this.world.centerY - 250 + yShift, data["score"][key][value], tstyle);
            scoreBoard.add(newscore);
            xFlip = -0.9;
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        console.log(errorThrown);
        console.log(jqXHR.reponseText);
        var tstyle = { font: "12px Arial", fill: "#000" };
        var errormsg = Match3.game.make.text(Match3.game.world.centerX - 80, Match3.game.world.centerY - 250, "error retrieving database", tstyle);
        scoreBoard.add(errormsg);
      }
    });
  },

  endScore: function () {
    scoreBoard.destroy();
    scoreBack.destroy();
    this.createMenu();
  },

  loginFB: function () {
    FB.login(function (response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
          loginName = response.name;
        });
        menu.destroy();
        this.createMenu();
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  },

  createNamePrompt: function () {
    menu = this.add.group();
    loginStatus = this.make.text(10, 10, "Not Logged In.", { font: "16px Arial", fill: "#000" });
    menu.add(loginStatus);

    var message = this.make.text(this.world.centerX - 125, this.world.centerY - 250, "Please enter a username", { font: "bold 20px Arial", fill: "#000" });
    menu.add(message);

    var nameField = this.add.inputField(this.world.centerX - 185, this.world.centerY - 210, {
      font: '18px Arial',
      fill: '#000',
      padding: 9,
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
        this.createMenu();
      }
    }

    var submitButton = this.make.button(this.world.centerX + 50, this.world.centerY - 210, 'submit', nameSubmit, this, 2, 1, 0);
    menu.add(submitButton);

    var loginButton = this.make.button(this.world.centerX - 145, this.world.centerY - 150, 'fblogin', this.loginFB, this, 2, 1, 0);
    menu.add(loginButton);
  },

  statusChangeCallback: function (response) {
    if (response.status === 'connected') {
      FB.api('/me', function (response) {
        loginName = response.name;
      });
      menu.destroy();
      this.createMenu();
    } else {
      menu.destroy();
      this.createNamePrompt();
    }
  },

  logoutFB: function () {
    //doesn't work on local hosts
    /* FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            FB.logout(function (success) {
                if (success.authResponse) {
                    console.log('Successfully logged out.');
                    loginName = "";
                    menu.destroy();
                    this.createNamePrompt();
                } else {
                    console.log('Logout unsuccessful.');
                }
            });
        } else {
            console.log('Successfully logged out.');
            loginName = "";
            menu.destroy();
            this.createNamePrompt();
        }
    }); */

    console.log('Successfully logged out.');
    loginName = "";
    menu.destroy();
    this.createNamePrompt();
  }
};


