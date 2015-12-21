var app,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app = app || {};

define('menu', ['../lib/phaser.min'], function() {
  var Menu;
  return Menu = (function(superClass) {
    extend(Menu, superClass);

    function Menu() {
      return Menu.__super__.constructor.apply(this, arguments);
    }

    Menu.prototype.preload = function() {};

    Menu.prototype.create = function() {
      var labelTitle;
      labelTitle = app.game.add.text(app.game.width / 2, app.game.height / 2, "PRESS ENTER\n TO START", {
        font: "bold 64px Arial",
        fill: "#FFFFFF"
      });
      labelTitle.anchor.x = 0.5;
      labelTitle.anchor.y = 0.5;
    };

    Menu.prototype.update = function() {
      if (app.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        app.game.state.start('Game');
      }
    };

    return Menu;

  })(Phaser.Stage);
});
