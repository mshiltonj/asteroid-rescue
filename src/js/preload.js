AndRes.Preload = function(){};

AndRes.Preload.prototype = {
  preload: function(){
    this.game.load.spritesheet('start-button', './assets/images/start-button.png', 100, 30);
    this.game.load.image('ship', './assets/images/ship.png');
  },

  create: function(){
    this.game.state.start('menu');
  }

};