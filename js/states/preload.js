var Match3 = Match3 || {};

//loading the game assets
Match3.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.image('block1', 'assets/images/1.png');
    this.load.image('block2', 'assets/images/2.png');
    this.load.image('block3', 'assets/images/3.png');
    this.load.image('block4', 'assets/images/4.png');
    this.load.image('block5', 'assets/images/5.png');
    this.load.image('block6', 'assets/images/6.png');
    //this.load.image('block7', 'assets/images/7.png');
    //this.load.image('block8', 'assets/images/8.png');
    this.load.image('deadBlock', 'assets/images/dead.png');
    this.load.image('background', 'assets/images/backyard2.png');
    this.load.image('start', 'assets/button/start.png');
    this.load.image('highscore', 'assets/button/highscores.png');
    this.load.image('back', 'assets/button/back.png');
    this.load.image('fblogin', 'assets/button/fblogin.png');
    this.load.image('fblogout', 'assets/button/fblogout.png');
    this.load.image('submit', 'assets/button/submit.png');
    this.load.audio('ding', 'assets/audio/ding.mp3');

  },
  create: function() {
    this.state.start('Game');
  }
};