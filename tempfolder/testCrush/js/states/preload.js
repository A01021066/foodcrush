var Match3 = Match3 || {};

Match3.PreloadState = {

    preload: function() {

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY);
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(100, 1);
        this.load.setPreloadSprite(this.preloadBar);


    },

    create: function() {

        this.state.start('Game');
    }

};