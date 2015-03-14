AndRes.Level1 = function(){};

AndRes.Level1.prototype = {
  preload: function(){

  },

  BOOSTER_FUEL: 0.0002,
  MANEUVER_FUEL: 0.00006,

  create: function(){

    this.rocketSound = this.game.add.audio('rocket');
    this.deathSound = this.game.add.audio('death');
    this.saveHumanSound = this.game.add.audio('saveHuman');
    this.fuelSound = this.game.add.audio('fuel');
    this.spaceLoop = this.game.add.audio('spaceLoop');
    this.victorySound = this.game.add.audio('victory');

    this.map = this.game.add.tilemap('level0');
    this.map.addTilesetImage('level0');
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');

    this.backgroundLayer.resizeWorld();

    this.map.setCollisionBetween(0, 100, true, 'collisionLayer');


    var groups = ['personGroup', 'fuelGroup', 'landing_padGroup', 'victoryGroup'];
    groups.forEach(function(groupName){
      delete this[groupName];
      this[groupName] = this.game.add.group();
      this[groupName].enableBody = true;
    }, this);


    this.loadObjects();

    this.personGroup.forEach(function(person){
      person.body.setSize(15, 19, 9, 13 );
    });

    this.victoryGroup.forEach(function(object){
      object.body.setSize(48, 9);
    });

 //
    this.ship = this.game.add.sprite(250,415, 'level0', 11);


    this.youLoseText = this.game.add.bitmapText(0, 0, 'spacefont', "You Lose!", 72);

    this.youLoseText.tint = 0xFF0000;
    this.youLoseText.visible = false;
    this.youLoseText.scale.set(4, 4);
    this.youLoseText.cameraOffset.x = this.game.width / 2 - this.youLoseText.width / 2;
    this.youLoseText.cameraOffset.y = this.game.height / 2 - this.youLoseText.height / 2;
    this.youLoseText.alpha = 0;
    this.youLoseText.fixedToCamera = true;


    this.youWinText = this.game.add.bitmapText(0, 0, 'spacefont', "YOU WIN!!", 96);
    //this.youWinText.tint = 0xFFFF00;
    this.youWinText.visible = false;
    this.youWinText.scale.set(4, 4);
    this.youWinText.cameraOffset.x = this.game.width / 2 - this.youWinText.width / 2;
    this.youWinText.cameraOffset.y = this.game.height / 2 - this.youWinText.height / 2;
    this.youWinText.alpha = 0;
    this.youWinText.fixedToCamera = true;


    this.boostBottom = this.game.add.sprite(10, 29, 'boost-bottom');



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
    // this.boostBottom.gravity = -100;
    this.boostBottom.on = false;
    this.boostBottom.start(false, 20, 6);
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
    // this.boostLeft.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
    // this.boostLeft.gravity = -100;
    this.boostLeft.on = false;
    this.boostLeft.start(false, 20, 6);
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
    // this.boostRight.setScale(0.4, 2, 0.4, 2, 6000, Phaser.Easing.Quintic.Out);
    // this.boostRight.gravity = -100;
    this.boostRight.on = false;
    this.boostRight.start(false, 20, 6);
    //this.boostRight.emitX = 64;
    //this.boostRight.emitY = 500;




    this.ship.addChild(this.boostBottom);
    this.ship.addChild(this.boostLeft);
    this.ship.addChild(this.boostRight);

    this.game.physics.arcade.enable(this.ship);
    this.game.camera.follow(this.ship);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.ship.body.gravity.y = 100;
    this.ship.fuel = 1;


    this.fuelText = this.game.add.bitmapText(10, 10, 'spacefont', "Fuel: " + this.ship.fuel, 18 );
    this.fuelText.fixedToCamera = true;
    this.startTime = this.game.time.now;
    this.duration = 0;
    this.previousPauses = this.game.time.pauseDuration;

    this.humansSaved = 0;
    this.humansText = this.game.add.bitmapText(10, 50, 'spacefont', "" + this.personGroup.length, 18);
    this.humansText.fixedToCamera = true;
    this.updateHumansSaved();

    this.durationText = this.game.add.bitmapText(10, 30, 'spacefont', "Time: " + this.displayDuration(), 18 );
    this.durationText.fixedToCamera = true;

    this.horizontalVelocityText = this.game.add.bitmapText( this.game.width - 140, 10, 'spacefont', 'TTTT', 18);
    this.horizontalVelocityText.fixedToCamera = true;
    this.verticalVelocityText = this.game.add.bitmapText(  this.game.width - 140, 30, 'spacefont', 'TTTT', 18);
    this.verticalVelocityText.fixedToCamera = true;

    this.spaceLoop.play('', null, 0.4);
  },

  youLose: function(){
    this.youLoseText.visible = true;
    var newTextX = this.game.width / 2 - this.youLoseText.width  / 8;
    var newTextY = this.game.height / 2 - this.youLoseText.height / 8;

    this.game.add.tween(this.youLoseText).to({alpha: 1}, 500).start();
    this.game.add.tween(this.youLoseText.scale).to({x: 1, y: 1}, 350).start();
    this.game.add.tween(this.youLoseText.cameraOffset).to({x: newTextX, y: newTextY}, 350).start();
  },

  updateHumansSaved: function(){
    this.humansText.setText("Humans: " + this.humansSaved + "/" + this.personGroup.length);
  },

  updateVelocityText: function(){
    this.verticalVelocityText.setText("Y Speed: " + Math.floor(Math.abs(this.ship.body.velocity.y)));
    this.horizontalVelocityText.setText("X Speed: " + Math.floor(Math.abs(this.ship.body.velocity.x)));
  },

  displayDuration: function(){
    var durationInSec = parseInt(this.duration / 1000);

    var mod = durationInSec % 60;
    if (mod < 10){
      mod  = "0" + '' + mod;
    }
    return (parseInt(durationInSec / 60)) + ":" + mod;
  },

  update: function(){

    this.ship.body.acceleration.x = 0;
    this.ship.body.acceleration.y = 0;

    this.rocketsOn = false;

    if (this.ship.endGame){
      this.ship.body.velocity.x = 0;
      this.ship.body.velocity.y = 0;
      this.boostBottom.on = false;
      this.boostLeft.on = false;
      this.boostRight.on = false;
      this.ship.body.allowGravity = false;

    } else {
      this.duration = this.game.time.now - this.startTime - this.game.time.pauseDuration + this.previousPauses;;
      this.durationText.setText("Time: " + this.displayDuration());

      this.ship.currentFrameVelocityX = this.ship.body.velocity.x;
      this.ship.currentFrameVelocityY = this.ship.body.velocity.y;
      // this.updateVelocityText();
      this.game.physics.arcade.overlap(this.ship, this.collisionLayer, this.playerHit, null, this);
      this.updateVelocityText();

      if(this.cursors.up.isDown && this.ship.fuel > 0){
        this.boostBottom.on = true;
        this.ship.body.acceleration.y = -200;
        this.ship.fuel -= this.BOOSTER_FUEL;
        this.rocketsOn = true;
      } else {
        this.boostBottom.on = false;
      }

      if(this.cursors.right.isDown && this.ship.fuel > 0){
        this.boostLeft.on = true;
        this.ship.body.acceleration.x += 20;
        this.ship.fuel -= this.MANEUVER_FUEL;
        this.rocketsOn = true;
      } else {
        this.boostLeft.on = false;
      }

      if(this.cursors.left.isDown && this.ship.fuel > 0){
        this.boostRight.on = true;
        this.ship.body.acceleration.x += -20;
        this.ship.fuel -= this.MANEUVER_FUEL;
        this.rocketsOn = true;

      } else {
        this.boostRight.on = false;
      }

      this.game.physics.arcade.overlap(this.ship, this.personGroup, this.collectPerson, null, this);
      this.game.physics.arcade.overlap(this.ship, this.fuelGroup, this.collectFuel, null, this);
      this.game.physics.arcade.overlap(this.ship, this.victoryGroup, this.youWon, this.safelyLanded, this);

      this.fuelText.setText("Fuel: " + this.massagedFuelText());
    }


    if (this.rocketsOn){
      if (! this.rocketSound.isPlaying ){
        this.rocketSound.play('', null, 0.4, true, true);//'',null, null, true, true);
      }
    } else {
      this.rocketSound.stop();
    }
  },

  youWon: function(player){
    player.endGame = true;
    this.stopShip();
    this.victorySound.play('', null, 0.6);

    this.youWinText.visible = true;
    var newTextX = this.game.width / 2 - this.youWinText.width  / 8;
    var newTextY = this.game.height / 2 - this.youWinText.height / 8;

    this.game.add.tween(this.youWinText).to({alpha: 1}, 1000).start();
    this.game.add.tween(this.youWinText.scale).to({x: 1, y: 1}, 1000).start();
    this.game.add.tween(this.youWinText.cameraOffset).to({x: newTextX, y: newTextY}, 1000).start();

    console.log("YOU WON!!");
  },

  safelyLanded: function(ship, landingPad){

    if (this.isTooFast(ship)) { return false; }

    var leftEdge, rightEdge;

    var shipLeft = new Phaser.Point(ship.x, ship.y + ship.height);
    var shipRight = new Phaser.Point(ship.x + ship.width, ship.y + ship.height);

    if (shipLeft.x > landingPad.body.x && shipLeft.x < landingPad.x + landingPad.body.width &&
        shipLeft.y > landingPad.body.y && shipLeft.y < landingPad.y + landingPad.body.height
    ){
        leftEdge = true;
    }

    if (shipRight.x > landingPad.body.x && shipRight.x < landingPad.x + landingPad.body.width &&
        shipRight.y > landingPad.body.y && shipRight.y < landingPad.y + landingPad.body.height
    ){
      rightEdge = true;
    }



    return !!(leftEdge && rightEdge);
  },

  landingPadHit: function(){

  },

  loadObjectsByLayer: function(layer){
    this.map.objects[layer].forEach(function(item){
      if (item.name == 'ship') { return;}

      var groupName = item.name + "Group";

      if (this[groupName]) {
        if (item.gid){
          this[groupName].create(item.x, item.y - this.map.tileHeight, 'level0', item.gid - 1);
        } else {
          this[groupName].create(item.x, item.y);
        }
      }
      else {
        if (item.gid){
          this.game.add.sprite(item.x, item.y - this.map.tileHeight, 'level0', item.gid - 1);
        } else {
          this.game.add.sprite(item.x, item.y);
        }
      }
    },this);
  },

  loadObjects: function(layer){
    this.loadObjectsByLayer('objectLayer');
    this.loadObjectsByLayer('invisibleLayer');
  },

  isTooFast: function(player){
    var safeLandingSpeed = 38;

    return (Math.abs(player.currentFrameVelocityX) > safeLandingSpeed ||
              Math.abs(player.currentFrameVelocityY) > safeLandingSpeed);

  },

  playerHit: function(player, tile) {

    if (this.isTooFast(player)){
      player.endGame = true;
      player.tint = 0xff0000;

      this.stopShip();

      this.deathSound.play('', null, 0.25);
      this.youLose();


      this.game.time.events.add(1500, this.restart, this);
    }

  },

  stopShip: function(){
    this.rocketSound.stop();
    this.spaceLoop.stop();
  },

  restart: function(){
    this.ship.isDying = false;
    this.game.state.start('level1');
  },

  collectFuel: function(player, fuel){
    if (fuel.collecting){

      return;
    }

    fuel.collecting = true;

    if (player.fuel < 1){
      player.fuel += 0.25;
      this.fuelSound.play('', null, 0.4);
      if (player.fuel > 1) { player.fuel = 1.0; }
    }

    var tween = this.game.add.tween(fuel).to({x: player.x, y: player.y}, 300);
    tween.onComplete.add(function(){    fuel.kill();
    });
    tween.start();
  },

  collectPerson: function(player, human){
    if (human.saving) {
      return;
    }

    human.saving = true;
    this.humansSaved += 1;
    this.updateHumansSaved();
    this.saveHumanSound.play();
    var tween = this.game.add.tween(human).to({x: player.x, y: player.y}, 300);
    tween.onComplete.add(function(){    human.kill();
    });
    tween.start();
  },

  massagedFuelText: function() {
    return Math.ceil(this.ship.fuel * 100);
  },

  render: function(){
    //if (this.victoryGroup) {
    //  this.victoryGroup.forEachAlive(this.game.debug.body, this.game.debug);
    //}
  }
};