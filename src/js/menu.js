AndRes.Menu = function(){};

AndRes.Menu.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.sprite(0,0, 'menu-background');

    this.game.add.text(10,10, "Asteroid Rescue", { font: "32px Arial", fill: "#fff"});
    this.game.add.button(this.game.world.centerX - 55, this.game.world.centerY - 15, 'start-button', this.start, this, 1, 0, 2);

  },

  start: function(){
    this.game.state.start('level1');
  }
};