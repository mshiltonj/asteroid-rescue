AndRes.Menu = function(){};

AndRes.Menu.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.sprite(0,0, 'menu-background');

    this.startButton = this.game.add.button(this.game.world.centerX - 55, this.game.world.centerY + 50, 'start-button', this.start, this, 1, 0, 2);

    this.textGroup = this.game.add.group();

    this.textGroup.add(this.game.add.bitmapText(200,50, 'spacefont', 'Asteroid', 72));
    this.textGroup.add(this.game.add.bitmapText(300,125, 'spacefont', 'Rescue', 72));

    this.textGroup.alpha = 0.0;
    //this.textGroup.angle = 45;

    this.startButton.alpha = 0;
    this.startButton.visible = false;


    this.textGroup.forEach(function(item){
      this.game.add.tween(item).to({y: item.y + 75}, 1500, Phaser.Easing.Bounce.Out).start();

    }, this);

    this.game.add.tween(this.textGroup).to({alpha: 1}, 1000).start();

    this.game.time.events.add(1500, function(){
      this.startButton.visible = true;
      this.game.add.tween(this.startButton).to({alpha: 1}, 150).start();
    }, this);

  },

  start: function(){
    this.game.state.start('level1');
  }
};