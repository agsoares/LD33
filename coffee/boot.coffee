app = app || {}

define 'boot', ['../lib/phaser.min'], () ->
  class Boot extends Phaser.Stage
    preload: ->
      return

    create: ->
      app.game.state.start 'Preloader'
      return

    update: ->
      return