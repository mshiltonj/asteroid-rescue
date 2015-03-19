AndRes.Credits = function(){};

AndRes.Credits.prototype = {
  preload: function(){

  },

  create: function(){
    this.game.add.sprite(0,0, 'menu-background');

    this.mainMenuButton = this.game.add.button(180, 325, 'main-menu-button', this.mainMenu, this, 1, 0, 2);

    var graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(0x000000);
    graphics.drawRect(140, 100, 430, 210);

    this.textGroup = this.game.add.group();

    var fontOptions = {
      font: '12px Arial',
      fill: '#FFFF00'
    };
    var i = 0;
    this.textGroup.add(this.game.make.text(150, 112, "Asteroid Rescue Credits:", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, "Code and graphics by Steven Hilton, mshiltonj@gmail.com", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, "Code and graphics distributed under MIT License", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, "All sound effects from public domain sources", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, "Background music:", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, "   http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100672", fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, '   "Space Fighter Loop" Kevin MacLeod (incompetech.com)', fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, '   Licensed under Creative Commons: By Attribution 3.0', fontOptions));
    this.textGroup.add(this.game.make.text(150, 112 + ++i * 20, '   http://creativecommons.org/licenses/by/3.0/', fontOptions));
    //http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100672
    //    "Space Fighter Loop" Kevin MacLeod (incompetech.com)
    //Licensed under Creative Commons: By Attribution 3.0
    //http://creativecommons.org/licenses/by/3.0/
  },

  mainMenu: function(){
    this.game.state.start('menu');
  }

};