var app,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = app || {};

define('preloader', ['../lib/phaser.min'], function() {
  var Preloader;
  return Preloader = (function(superClass) {
    extend(Preloader, superClass);

    function Preloader() {
      return Preloader.__super__.constructor.apply(this, arguments);
    }

    Preloader.prototype.preload = function() {
      this.load.image('logo', 'assets/HTML5.png');
      this.load.spritesheet('tileset', 'assets/tileset.png', 32, 32);
    };

    Preloader.prototype.create = function() {
      app.game.state.start('Game');
    };

    Preloader.prototype.update = function() {};

    return Preloader;

  })(Phaser.Stage);
});
