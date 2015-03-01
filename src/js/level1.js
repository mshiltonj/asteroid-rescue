AndRes.Level1 = function(){};

AndRes.Level1.prototype = {
  preload: function(){

  },

  BOOSTER_FUEL: 0.00012,
  MANEUVER_FUEL: 0.00004,

  create: function(){

    this.map = this.game.add.tilemap('level0');
    this.map.addTilesetImage('level0');
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');

    this.backgroundLayer.resizeWorld();

    this.map.setCollisionBetween(0, 100, true, 'collisionLayer');


    this.boostBottom = this.game.add.sprite(10, 29, 'boost-bottom');
    this.boostLeft = this.game.add.sprite(-7, 11, 'boost-left');
    this.boostRight = this.game.add.sprite(31, 11, 'boost-right');

    this.boostBottom.visible = false;
    this.boostLeft.visible = false;
    this.boostRight.visible = false;

    this.ship = this.game.add.sprite(250,415, 'ship');


    this.ship.addChild(this.boostBottom);
    this.ship.addChild(this.boostLeft);
    this.ship.addChild(this.boostRight);

    this.game.physics.arcade.enable(this.ship);
    this.game.camera.follow(this.ship);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.ship.body.gravity.y = 100;
    this.ship.fuel = 1;


    this.fuelText = this.game.add.bitmapText(10, 10, 'spacefont', "Fuel: " + this.ship.fuel, 24 );
    this.fuelText.fixedToCamera = true;
  },

  update: function(){

    this.ship.body.acceleration.x = 0;
    this.ship.body.acceleration.y = 0;


    this.ship.currentFrameVelocityX = this.ship.body.velocity.x;
    this.ship.currentFrameVelocityY = this.ship.body.velocity.y;

    this.game.physics.arcade.overlap(this.ship, this.collisionLayer, this.playerHit, null, this);


    if(this.cursors.up.isDown && this.ship.fuel > 0){
      this.boostBottom.visible = true;
      this.ship.body.acceleration.y = -200;
      this.ship.fuel -= this.BOOSTER_FUEL;

    } else {
      this.boostBottom.visible = false;
    }

    if(this.cursors.right.isDown && this.ship.fuel > 0){
      this.boostLeft.visible = true;
      this.ship.body.acceleration.x += 20;
      this.ship.fuel -= this.MANEUVER_FUEL;
    } else {
      this.boostLeft.visible = false;
    }


    if(this.cursors.left.isDown && this.ship.fuel > 0){
      this.boostRight.visible = true;
      this.ship.body.acceleration.x += -20;
      this.ship.fuel -= this.MANEUVER_FUEL;

    } else {
      this.boostRight.visible = false;
    }

    this.fuelText.setText("Fuel: " + this.massagedFuelText());
  },

  playerHit: function(player, tile){
    if(Math.abs(player.currentFrameVelocityX) > 30 || Math.abs(player.currentFrameVelocityY) > 30){
      this.game.state.start('level1');
    }
  },

  massagedFuelText: function() {
    return Math.ceil(this.ship.fuel * 100);
  }


};