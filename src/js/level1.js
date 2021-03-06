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

    this.loadShip('playerLayer', AndRes.Ship);

    this.loadObjects();

    this.personGroup.forEach(function(person){
      person.body.setSize(15, 19, 9, 13 );
    });


    this.youLoseText = this.game.add.bitmapText(0, 0, 'spacefont', "You Lose!", 72);
    this.youLoseText.tint = 0xFF0000;
    this.youLoseText.visible = false;
    this.youLoseText.scale.set(4, 4);
    this.youLoseText.fixedToCamera = true;
    this.youLoseText.cameraOffset.x = this.game.width / 2 - this.youLoseText.width / 2;
    this.youLoseText.cameraOffset.y = this.game.height / 2 - this.youLoseText.height / 2;
    this.youLoseText.alpha = 0;


    this.allHumansNotSavedWarning = this.game.add.bitmapText(0,0, 'spacefont', "All Humans Not Saved!", 48);
    this.allHumansNotSavedWarning.visible = false;
    this.allHumansNotSavedWarning.fixedToCamera = true;

    this.allHumansNotSavedWarning.cameraOffset.x = this.game.width / 2 - this.allHumansNotSavedWarning.width / 2;
    this.allHumansNotSavedWarning.cameraOffset.y = this.game.height / 2 - this.allHumansNotSavedWarning.height / 2;


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
      this.ship.boostBottom.on = false;
      this.ship.boostLeft.on = false;
      this.ship.boostRight.on = false;
      this.ship.body.allowGravity = false;
      this.rocketSound.stop();
    } else {
      this.duration = this.game.time.now - this.startTime - this.game.time.pauseDuration + this.previousPauses;;
      this.durationText.setText("Time: " + this.displayDuration());

      this.ship.currentFrameVelocityX = this.ship.body.velocity.x;
      this.ship.currentFrameVelocityY = this.ship.body.velocity.y;
      // this.updateVelocityText();
      this.game.physics.arcade.overlap(this.ship, this.collisionLayer, this.playerHit, null, this);
      this.updateVelocityText();

      if(this.cursors.up.isDown && this.ship.fuel > 0){
        this.ship.boostBottom.on = true;
        this.ship.body.acceleration.y = -200;
        this.ship.fuel -= this.BOOSTER_FUEL;
        this.rocketsOn = true;
      } else {
        this.ship.boostBottom.on = false;
      }

      if(this.cursors.right.isDown && this.ship.fuel > 0){
        this.ship.boostLeft.on = true;
        this.ship.body.acceleration.x += 20;
        this.ship.fuel -= this.MANEUVER_FUEL;
        this.rocketsOn = true;
      } else {
        this.ship.boostLeft.on = false;
      }

      if(this.cursors.left.isDown && this.ship.fuel > 0){
        this.ship.boostRight.on = true;
        this.ship.body.acceleration.x += -20;
        this.ship.fuel -= this.MANEUVER_FUEL;
        this.rocketsOn = true;
      } else {
        this.ship.boostRight.on = false;
      }


      if (this.rocketsOn){
        if (! this.rocketSound.isPlaying ){
          this.rocketSound.play('', null, 0.4, true, true);//'',null, null, true, true);
        }
      } else {
        if (this.rocketSound.isPlaying) {
          this.rocketSound.stop();
        }
      }
      this.game.physics.arcade.overlap(this.ship, this.personGroup, this.collectPerson, null, this);
      this.game.physics.arcade.overlap(this.ship, this.fuelGroup, this.collectFuel, null, this);
      this.displayAllHumansNotSavedWarning = false;

      this.game.physics.arcade.overlap(this.ship, this.victoryGroup, this.youWon, this.safelyLandedAndSavedAllHumans, this);

      if (this.displayAllHumansNotSavedWarning){
        this.allHumansNotSavedWarning.visible = true;
      } else {
        this.allHumansNotSavedWarning.visible = false;
      }

      this.fuelText.setText("Fuel: " + this.massagedFuelText());
    }

  },

  youWon: function(player){
    player.endGame = true;
    this.stopShip();
    this.game.state.start('victory');
  },



  safelyLandedAndSavedAllHumans: function(ship, landingPad){
    //landingPad.body.setSize(landingPad.width, landingPad.height);

    var slowEnough, allHumansSaved, safelyLanded;
    var leftEdge, rightEdge;

    if (! this.isTooFast(ship)) { slowEnough = true; }

    if (this.humansSaved == this.personGroup.length) {
      allHumansSaved = true;
    }

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

    if (rightEdge && leftEdge){
      safelyLanded = true;
    }

    if (safelyLanded && ! allHumansSaved){
      this.displayAllHumansNotSavedWarning = true;
    }

    var rv = !!(allHumansSaved && slowEnough && safelyLanded)

    return rv;
  },

  loadShip: function(layer, klass){

    var item = this.map.objects[layer][0];
    var ship;
    this.ship = new AndRes.Ship(this.game, item.x, item.y - this.map.tileHeight, 'level0', item.gid - 1);
    this.game.add.existing(this.ship);
  },

  loadObjectsByLayer: function(layer){
    this.map.objects[layer].forEach(function(item){

      var groupName = item.name + "Group";
      var object;

      if (this[groupName]) {
        if (item.gid){
          this[groupName].create(item.x, item.y - this.map.tileHeight, 'level0', item.gid - 1);
        } else {
          object = this[groupName].create(item.x, item.y);
          object.width = item.width;
          object.height = item.height;
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