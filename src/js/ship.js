AndRes.Ship = function(game, x, y, key, frame){
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.addBoosters();

  //this.anchor.setTo(0,5, 0.5);
};

AndRes.Ship.prototype = Object.create(Phaser.Sprite.prototype);
AndRes.Ship.prototype.constructor = AndRes.Ship;


AndRes.Ship.prototype.addBoosters = function(){



  this.boostBottom = this.game.add.emitter(16, 36);
  this.boostBottom.makeParticles('spark');

  this.boostBottom.width = 10;

  this.boostBottom.gravity = 0;
  this.boostBottom.setXSpeed(150, -150);
  this.boostBottom.setYSpeed(150, 250);
  //  this.boostBottom.setScale(0.25, 0.1);
  //this.boostBottom.setRotation(30, -30);
  this.boostBottom.setAlpha(0.6,0.8, 100);
  this.boostBottom.setScale(0.1, 0.25);
  this.boostBottom.start(false, 20, 6);
  // this.boostBottom.gravity = -100;
  this.boostBottom.on = true;
  //this.boostBottom.emitX = 64;
  //this.boostBottom.emitY = 500;

  this.boostLeft = this.game.add.emitter(0, 16);
  this.boostLeft.makeParticles('spark');

  this.boostLeft.height = 5;

  this.boostLeft.gravity = 0;
  this.boostLeft.setYSpeed(0,0);
  this.boostLeft.setXSpeed(-150, -250);
  this.boostLeft.setScale(1, 1, 0.1, 0.11);
  //this.boostLeft.setRotation(30, -30);
  this.boostLeft.setAlpha(0.6,0.8, 100);
  this.boostLeft.start(false, 20, 6);
  // this.boostLeft.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
  // this.boostLeft.gravity = -100;
  this.boostLeft.on = false;
  //this.boostLeft.emitX = 64;
  //this.boostLeft.emitY = 500;



  this.boostRight = this.game.add.emitter(31, 16);
  this.boostRight.makeParticles('spark');

  this.boostRight.height = 5;

  this.boostRight.gravity = 0;
  this.boostRight.setYSpeed(0,0);
  this.boostRight.setXSpeed(150, 250);
  this.boostRight.setScale(1, 1, 0.1, 0.11);

  //this.boostRight.setRotation(30, -30);
  this.boostRight.setAlpha(0.6,0.8, 100);
  this.boostRight.start(false, 20, 6);
  // this.boostRight.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
  // this.boostRight.gravity = -100;
  this.boostRight.on = false;
  //this.boostRight.emitX = 64;
  //this.boostRight.emitY = 500;




  this.addChild(this.boostBottom);
  this.addChild(this.boostLeft);
  this.addChild(this.boostRight);


};

