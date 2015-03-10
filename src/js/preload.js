AndRes.Preload = function(){};

AndRes.Preload.prototype = {
  preload: function(){
    this.game.load.bitmapFont('spacefont', './assets/fonts/font.png', './assets/fonts/font.fnt');
    this.game.load.spritesheet('start-button', './assets/images/start-button.png', 100, 30);
    this.game.load.tilemap('level0', './assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('level0', './assets/level0.png', 32, 32);
   // this.game.load.image('ship', './assets/images/ship.png');
    this.game.load.image('boost-bottom', './assets/images/boost-bottom.png');
    this.game.load.image('boost-left', './assets/images/boost-left.png');
    this.game.load.image('boost-right', './assets/images/boost-right.png');
    this.game.load.image('menu-background', './assets/images/menu.png');

    this.game.load.audio('rocket', './assets/audio/rocket-sound.mp3');
    this.game.load.audio('death', './assets/audio/death.mp3');
    this.game.load.audio('fuel', './assets/audio/fuel.mp3');
    this.game.load.audio('saveHuman', './assets/audio/save-human.mp3');
    this.game.load.audio('spaceLoop', './assets/audio/space-fighter-loop.mp3');
    this.game.load.audio('victory', './assets/audio/victory.mp3');
  },

  create: function(){
    this.game.state.start('menu');
  }

};