AndRes.Menu = function(){};

AndRes.Menu.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.text(10,10, "Asteroid Rescue", { font: "32px Arial", fill: "#fff"});
    this.game.add.button(10, 50, 'start-button', this.start, this, 1, 0, 2);

  },

  start: function(){
    this.game.state.start('level1');
  }
};