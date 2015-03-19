AndRes.Menu = function(){};

AndRes.Menu.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.sprite(0,0, 'menu-background');
    this.rocketSound = this.game.add.audio('rocket');
    this.fuelSound = this.game.add.audio('fuel');

    this.howToButton = this.game.add.button(150, 310, 'how-to-button', this.howTo, this, 1, 0, 2);
    this.creditsButton = this.game.add.button(275, 310, 'credits-button', this.credits, this, 1, 0, 2);
    this.startButton = this.game.add.button(500, 300, 'start-button', this.start, this, 1, 0, 2);
    this.startButton.scale.x = 2;
    this.startButton.scale.y = 2;

    this.textGroup = this.game.add.group();

    this.textGroup.add(this.game.add.bitmapText(125,25, 'spacefont', 'Asteroid', 72));
    this.textGroup.add(this.game.add.bitmapText(225,100, 'spacefont', 'Rescue', 72));

    this.textGroup.alpha = 0.0;

    this.startButton.alpha = 0;
    this.startButton.visible = false;


    this.textGroup.forEach(function(item){
      this.game.add.tween(item).to({y: item.y + 75}, 1500, Phaser.Easing.Bounce.Out).start();

    }, this);

    this.ship = new AndRes.Ship(this.game, -125, 200, 'level0', 11);
    this.ship.pivot.setTo(16, 16);
    this.ship.scale.x = 4;
    this.ship.scale.y = 4;
    this.ship.rotation = 45;

    this.game.add.existing(this.ship);


    var tween = this.game.add.tween(this.textGroup).to({alpha: 1}, 1000);
    tween.onComplete.add(function(){
      this.rocketSound.play();

      var shipTween = this.game.add.tween(this.ship).to({x: 625, y: 175}, 500);

      shipTween.onComplete.add(function(){
        this.rocketSound.stop();
        this.fuelSound.play();

      }, this);

      shipTween.start();


    }, this);

    tween.start();


    this.game.time.events.add(1500, function(){
      this.startButton.visible = true;
      this.game.add.tween(this.startButton).to({alpha: 1}, 150).start();
    }, this);

  },

  start: function(){
    this.game.state.start('level1');
  },

  credits: function(){
    this.rocketSound.stop();
    this.fuelSound.stop();
    this.game.state.start('credits');
  },

  howTo: function(){
    this.rocketSound.stop();
    this.fuelSound.stop();
    this.game.state.start('howTo');
  }
};