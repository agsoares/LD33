var app,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = app || {};

define('player', ['config', '../lib/phaser.min'], function(Config) {
  var Player;
  return Player = (function(superClass) {
    extend(Player, superClass);

    function Player(x, y) {
      this.gridPos = {
        x: x,
        y: y
      };
      this.screenPos = Config.returnScreenPos(this.gridPos);
      Player.__super__.constructor.call(this, app.game, this.screenPos.x, this.screenPos.y, 'tileset', 1);
      app.game.add.existing(this);
      return;
    }

    return Player;

  })(Phaser.Sprite);
});
