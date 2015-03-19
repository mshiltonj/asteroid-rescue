AndRes.HowTo = function(){};

AndRes.HowTo.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.sprite(0,0, 'menu-background');
    this.mainMenuButton = this.game.add.button(180, 325, 'main-menu-button', this.mainMenu, this, 1, 0, 2);

    var graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(0x000000);
    graphics.drawRect(140, 100, 400, 210);

    this.textGroup = this.game.add.group();

    var fontOptions = {
      font: '18px Arial',
      fill: '#FFFF00'
    };

    var i = 0;
    this.textGroup.add(this.game.make.text(150, 112, "Asteroid Rescue How To:", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 32, "1. Use arrow key to control ship thrusters.", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 32, "2. Be careful! Don't hit the walls too quickly.", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 32, "3. Collect fuel. You will need it.", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 32, "4. Save the humans!", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 32, "5. Land carefully on the landing pad! Victory!", fontOptions));

  },

  mainMenu: function(){
    this.game.state.start('menu');
  }

};