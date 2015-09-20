var app,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = app || {};

define('boot', ['../lib/phaser.min'], function() {
  var Boot;
  return Boot = (function(superClass) {
    extend(Boot, superClass);

    function Boot() {
      return Boot.__super__.constructor.apply(this, arguments);
    }

    Boot.prototype.preload = function() {};

    Boot.prototype.create = function() {
      app.game.state.start('Preloader');
    };

    Boot.prototype.update = function() {};

    return Boot;

  })(Phaser.Stage);
});
