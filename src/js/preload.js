AndRes.Preload = function(){};

AndRes.Preload.prototype = {
  preload: function(){
    this.game.load.spritesheet('start-button', './assets/images/start-button.png', 100, 30);
    this.game.load.tilemap('level0', './assets/level0.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('level0', './assets/level0.png');
    this.game.load.image('ship', './assets/images/ship.png');
    this.game.load.image('boost-bottom', './assets/images/boost-bottom.png');
    this.game.load.image('boost-left', './assets/images/boost-left.png');
    this.game.load.image('boost-right', './assets/images/boost-right.png');
    this.game.load.image('menu-background', './assets/images/menu.png');
  },

  create: function(){
    this.game.state.start('menu');
  }

};