var app,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = app || {};

define('enemy', ['../lib/phaser.min'], function() {
  var Enemy;
  return Enemy = (function(superClass) {
    extend(Enemy, superClass);

    function Enemy() {
      return Enemy.__super__.constructor.apply(this, arguments);
    }

    return Enemy;

  })(Phaser.Sprite);
});
