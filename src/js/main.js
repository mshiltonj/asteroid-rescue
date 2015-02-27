
AndRes.game = new Phaser.Game(800,480, Phaser.AUTO, 'game');

AndRes.game.state.add('boot', AndRes.Boot);

AndRes.game.state.add('preload', AndRes.Preload);
AndRes.game.state.add('menu', AndRes.Menu);
AndRes.game.state.add('level1', AndRes.Level1);

AndRes.game.state.start('boot');