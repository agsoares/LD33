app = app || {}

define 'menu', ['../lib/phaser.min'], () ->
  class Menu extends Phaser.Stage
    preload: ->
      return


    create: ->
      labelTitle = app.game.add.text app.game.width/2, app.game.height/2, "PRESS ENTER\n TO START", { font: "bold 64px Arial", fill: "#FFFFFF" }
      labelTitle.anchor.x = 0.5;
      labelTitle.anchor.y = 0.5;
      return

    update: ->
      app.game.state.start 'Game' if app.game.input.keyboard.isDown Phaser.Keyboard.ENTER
      return
