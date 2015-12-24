app = app || {}

define 'preloader', ['phaser'], () ->
  class Preloader extends Phaser.Stage
    preload: ->
      @load.image 'logo', 'assets/HTML5.png'
      @load.spritesheet 'tileset', 'assets/tileset.png', 32, 32
      return

    create: ->
      app.game.state.start 'Menu'
      return

    update: ->
      return
