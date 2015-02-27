AndRes.Level1 = function(){};

AndRes.Level1.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.text(10,10, "THIS IS LEVEL1", { font: "32px Arial", fill: "#fff"});
    this.ship = this.game.add.sprite(10,50, 'ship');

    this.game.physics.arcade.enable(this.ship);

    this.ship.body.gravity.y = 500;
  }

};