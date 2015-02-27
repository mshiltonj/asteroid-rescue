var AndRes = {};

AndRes.Boot = function(){};

AndRes.Boot.prototype = {
  preload: function(){

  },

  create: function(){

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('preload');
  }

};