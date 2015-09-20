app = app || {}

define 'preloader', ['../lib/phaser.min'], () ->
  class Preloader extends Phaser.Stage
    preload: ->
      @load.image 'logo', 'assets/HTML5.png'
      @load.spritesheet 'tileset', 'assets/tileset.png', 32, 32
      return

    create: ->
      app.game.state.start 'Game'
      return

    update: ->
      return
