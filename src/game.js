var app,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = app || {};

define('game', ['player', 'enemy', '../lib/phaser.min'], function(Player, Enemy) {
  var Game;
  return Game = (function(superClass) {
    extend(Game, superClass);

    function Game() {
      return Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.preload = function() {};

    Game.prototype.create = function() {
      this.layers = {
        backgronud: app.game.add.group(),
        foreground: app.game.add.group(),
        hud: app.game.add.group()
      };
      this.player = new Player(0, 0);
    };

    Game.prototype.update = function() {};

    return Game;

  })(Phaser.Stage);
});
