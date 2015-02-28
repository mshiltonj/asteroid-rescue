AndRes.Menu = function(){};

AndRes.Menu.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.sprite(0,0, 'menu-background');

    this.game.add.button(this.game.world.centerX - 55, this.game.world.centerY + 50, 'start-button', this.start, this, 1, 0, 2);
    this.game.add.bitmapText(200,125, 'spacefont', 'Asteroid', 72);
    this.game.add.bitmapText(300,200, 'spacefont', 'Rescue', 72);

  },

  start: function(){
    this.game.state.start('level1');
  }
};