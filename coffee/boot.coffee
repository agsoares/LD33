app = app || {}

define 'boot', ['phaser'], () ->
  class Boot extends Phaser.Stage
    preload: ->
      return

    create: ->
      app.game.state.start 'Preloader'
      return

    update: ->
      return
