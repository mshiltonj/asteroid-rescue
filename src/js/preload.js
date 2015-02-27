AndRes.Preload = function(){};

AndRes.Preload.prototype = {
  preload: function(){
    this.game.load.spritesheet('start-button', './assets/images/start-button.png', 100, 30);
    this.game.load.image('ship', './assets/images/ship.png');
    this.game.load.image('boost-bottom', './assets/images/boost-bottom.png');
    this.game.load.image('boost-left', './assets/images/boost-left.png');
    this.game.load.image('boost-right', './assets/images/boost-right.png');
  },

  create: function(){
    this.game.state.start('menu');
  }

};