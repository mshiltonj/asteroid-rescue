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

    delete this.personGroup;
    delete this.fuelGroup;
    delete this.landing_padGroup;

    this.loadObjects();

    this.personGroup.forEach(function(person){
      person.body.setSize(15, 19, 9, 13 );
    });

    this.boostBottom = this.game.add.sprite(10, 29, 'boost-bottom');
    this.boostLeft = this.game.add.sprite(-7, 11, 'boost-left');
    this.boostRight = this.game.add.sprite(31, 11, 'boost-right');

    this.boostBottom.visible = false;
    this.boostLeft.visible = false;
    this.boostRight.visible = false;

    this.ship = this.game.add.sprite(250,415, 'level0', 11);


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

    this.spaceLoop.play('', null, 0.25);
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

    if (this.ship.isDying){
      this.ship.body.velocity.x = 0;
      this.ship.body.velocity.y = 0;
      this.boostBottom.visible = false;
      this.boostLeft.visible = false;
      this.boostRight.visible = false;
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
        this.boostBottom.visible = true;
        this.ship.body.acceleration.y = -200;
        this.ship.fuel -= this.BOOSTER_FUEL;
        this.rocketsOn = true;
      } else {
        this.boostBottom.visible = false;
      }

      if(this.cursors.right.isDown && this.ship.fuel > 0){
        this.boostLeft.visible = true;
        this.ship.body.acceleration.x += 20;
        this.ship.fuel -= this.MANEUVER_FUEL;
        this.rocketsOn = true;
      } else {
        this.boostLeft.visible = false;
      }

      if(this.cursors.left.isDown && this.ship.fuel > 0){
        this.boostRight.visible = true;
        this.ship.body.acceleration.x += -20;
        this.ship.fuel -= this.MANEUVER_FUEL;
        this.rocketsOn = true;

      } else {
        this.boostRight.visible = false;
      }

      this.game.physics.arcade.overlap(this.ship, this.personGroup, this.collectPerson, null, this);
      this.game.physics.arcade.overlap(this.ship, this.fuelGroup, this.collectFuel, null, this);
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

  loadObjects: function(){
    this.map.objects['objectLayer'].forEach(function(item){
      if (item.name == 'ship') { return;}

      var groupName = item.name + "Group";
      if (!this[groupName]) {
        this[groupName] = this.game.add.group();
        this[groupName].enableBody = true;
      }

      this[groupName].create(item.x, item.y - this.map.tileHeight, 'level0', item.gid - 1);
    },this);
  },

  playerHit: function(player, tile){
    if(Math.abs(player.currentFrameVelocityX) > 38 || Math.abs(player.currentFrameVelocityY) > 38){
      player.isDying = true;
      player.tint = 0xff0000;
      this.rocketSound.stop();
      this.spaceLoop.stop();
      this.deathSound.play('', null, 0.15);

      this.game.time.events.add(1500, this.restart, this);

    }
  },

  restart: function(){
    this.ship.isDying = false;
    this.game.state.start('level1');
  },

  collectFuel: function(player, fuel){
    if (player.fuel < 1){
      fuel.kill();
      player.fuel += 0.25;
      this.fuelSound.play('', null, 0.4);
      if (player.fuel > 1) { player.fuel = 1.0; }
    }
  },

  collectPerson: function(player, human){
    human.kill();
    this.humansSaved += 1;
    this.updateHumansSaved();
    this.saveHumanSound.play();
  },

  massagedFuelText: function() {
    return Math.ceil(this.ship.fuel * 100);
  },

  render: function(){
    //if (this.personGroup) {
    //  this.personGroup.forEachAlive(this.game.debug.body, this.game.debug);
    //}
  }
};