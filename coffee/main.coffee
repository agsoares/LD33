app = {}

require.config({
  waitSeconds: 0,
  paths: {
        "phaser": "./lib/phaser.min"
    },
});


require ['config', 'boot', 'menu', 'preloader', 'game', 'phaser'], (Config, Boot, Menu,Preloader, Game) ->
  app.game = new Phaser.Game Config.width, Config.height, Phaser.AUTO, 'game-container', null
  app.game.state.add 'Boot', Boot, false
  app.game.state.add 'Menu', Menu, false
  app.game.state.add 'Preloader', Preloader, false
  app.game.state.add 'Game', Game, false
  app.game.state.start 'Boot'
  return
