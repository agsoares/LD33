var app;

app = {};

require.config({
  waitSeconds: 0
});

require(['config', 'boot', 'preloader', 'game', '../lib/phaser.min'], function(Config, Boot, Preloader, Game) {
  app.game = new Phaser.Game(Config.width, Config.height, Phaser.AUTO, 'game-container', null);
  app.game.state.add('Boot', Boot, false);
  app.game.state.add('Preloader', Preloader, false);
  app.game.state.add('Game', Game, false);
  app.game.state.start('Boot');
});
