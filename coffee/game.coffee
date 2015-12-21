app = app || {}

define 'game', ['player', 'enemy', '../lib/phaser.min'], (Player, Enemy) ->
  class Game extends Phaser.Stage
    preload: ->
      return


    create: ->
      @layers = {
          backgronud: app.game.add.group(),
          foreground: app.game.add.group(),
          hud:        app.game.add.group()
      }


      @player = new Player 0, 0
      return

    update: ->
      return
