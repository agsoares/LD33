var app = app || {};

app.Game = function() {};

var sprite;

app.Game.prototype = {
    preload: function() {

    },
    create: function() {
        sprite = app.game.add.sprite(app.game.width/2, app.game.height/2, 'logo');
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

    },
    update: function() {
    }
};
