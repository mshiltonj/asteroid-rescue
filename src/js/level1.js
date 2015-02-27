AndRes.Level1 = function(){};

AndRes.Level1.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.text(10,10, "THIS IS LEVEL1", { font: "32px Arial", fill: "#fff"});

    this.boostBottom = this.game.add.sprite(10, 29, 'boost-bottom');
    this.boostLeft = this.game.add.sprite(-7, 11, 'boost-left');
    this.boostRight = this.game.add.sprite(31, 11, 'boost-right');

    this.boostBottom.visible = false;
    this.boostLeft.visible = false;
    this.boostRight.visible = false;

    this.ship = this.game.add.sprite(10,50, 'ship');
    //this.ship.scale.x = 3;
    //this.ship.scale.y = 3;

    this.ship.addChild(this.boostBottom);
    this.ship.addChild(this.boostLeft);
    this.ship.addChild(this.boostRight);

    this.game.physics.arcade.enable(this.ship);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.ship.body.gravity.y = 100;
  },

  update: function(){

    this.ship.body.acceleration.x = 0;
    this.ship.body.acceleration.y = 0;


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

  }

};