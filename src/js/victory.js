AndRes.Victory = function(){};

AndRes.Victory.prototype = {
  preload: function(){

  },

  create: function(){
    this.victorySound = this.game.add.audio('victory');
    console.log("victory create");
    this.game.add.sprite(0,0, 'menu-background');
    this.successKid = this.game.add.sprite(0, 19, 'success');
    this.successKid.x = this.game.width / 2 - this.successKid.width / 2;


    this.youWinText = this.game.add.bitmapText(0, 0, 'spacefont', "YOU WIN!!", 96);
    //this.youWinText.tint = 0xFFFF00;
    this.youWinText.visible = false;
    this.youWinText.scale.set(4, 4);
    this.youWinText.x = this.game.width / 2 - this.youWinText.width / 2;
    this.youWinText.y = this.game.height / 2 - this.youWinText.height / 2;
    this.youWinText.alpha = 0;

    this.victorySound.play('', null, 0.6);

    this.youWinText.visible = true;
    var newTextX = this.game.width / 2 - this.youWinText.width  / 8;
    var newTextY = this.game.height / 2 - this.youWinText.height / 8;


    this.playAgainButton = this.game.add.button(0, 315, "play-again-button", this.playAgain, this, 1,0,2);
    this.playAgainButton.x = this.game.width / 2 - this.playAgainButton.width / 2;
    this.playAgainButton.alpha = 0;

    this.game.add.tween(this.youWinText).to({alpha: 1}, 1000).start();
    this.game.add.tween(this.youWinText.scale).to({x: 1, y: 1}, 1000).start();
    this.game.add.tween(this.youWinText).to({x: newTextX, y: newTextY}, 1000).start();

    this.game.time.events.add(3000, function(){
      this.playAgainButton.visible = true;
      this.game.add.tween(this.playAgainButton).to({alpha: 1}, 150).start();
    }, this);

    this.startFireworks();
  },

  startFireworks: function(){

    this.explosions = [];
    var explosion;
    for(var idx = 0; idx < 10; idx++){
      explosion = this.game.add.emitter(0,0,50);
      explosion.makeParticles('spark', 0, 20);
      explosion.setScale(0.35,0.36, 0.35, 0.36);
      explosion.setAlpha(1, 0, 1250 );

      this.explosions.push(explosion);
    }


    this.fireworksLauncher = this.game.add.emitter(400, 450);
    this.fireworksLauncher.makeParticles('spark', 0, 20);

    var explosionIdx = 0;
    this.fireworksLauncher.forEach(function(child){
      child.events.onKilled.add(function(child){

        this.explosions[explosionIdx].x = child.x;
        this.explosions[explosionIdx].y = child.y;
        this.explosions[explosionIdx].start(true, 1000, null, 20);
        explosionIdx++;
        if (explosionIdx >= this.explosions.length){
          explosionIdx = 0;
        }
      }, this);

    }, this);


    this.fireworksLauncher.gravity = 60;
    this.fireworksLauncher.setScale(0.2,0.21, 0.2, 0.21);
    this.fireworksLauncher.setXSpeed(-200, 200);
    this.fireworksLauncher.setYSpeed(-200, -300);
    this.fireworksLauncher.start(false, 1500, 400);


  },

  playAgain: function(){

    this.game.state.start('menu');
  }



};