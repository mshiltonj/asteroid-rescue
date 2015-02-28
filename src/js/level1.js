AndRes.Level1 = function(){};

AndRes.Level1.prototype = {
  preload: function(){

  },

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

    this.ship = this.game.add.sprite(96,415, 'ship');


    this.ship.addChild(this.boostBottom);
    this.ship.addChild(this.boostLeft);
    this.ship.addChild(this.boostRight);

    this.game.physics.arcade.enable(this.ship);
    this.game.camera.follow(this.ship);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.ship.body.gravity.y = 100;
  },

  update: function(){

    this.ship.body.acceleration.x = 0;
    this.ship.body.acceleration.y = 0;


    this.ship.currentFrameVelocityX = this.ship.body.velocity.x;
    this.ship.currentFrameVelocityY = this.ship.body.velocity.y;

    this.game.physics.arcade.overlap(this.ship, this.collisionLayer, this.playerHit, null, this);


    if(this.cursors.up.isDown){
      this.boostBottom.visible = true;
      this.ship.body.acceleration.y = -200;

    } else {
      this.boostBottom.visible = false;
    }

    if(this.cursors.right.isDown){
      this.boostLeft.visible = true;
      this.ship.body.acceleration.x += 20;
    } else {
      this.boostLeft.visible = false;
    }


    if(this.cursors.left.isDown){
      this.boostRight.visible = true;
      this.ship.body.acceleration.x += -20;
    } else {
      this.boostRight.visible = false;
    }

  },

  playerHit: function(player, tile){
    if(Math.abs(player.currentFrameVelocityX) > 30 || Math.abs(player.currentFrameVelocityY) > 30){
      this.game.state.start('level1');
    }

  }

};