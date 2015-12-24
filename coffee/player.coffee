app = app || {}

define 'player', ['config', 'phaser'], (Config) ->
  class Player extends Phaser.Sprite
    constructor: (x, y) ->
      @gridPos = { x: x, y: y }
      @screenPos = Config.returnScreenPos @gridPos
      super app.game, @screenPos.x, @screenPos.y, 'tileset', 1


      app.game.add.existing @
      return
