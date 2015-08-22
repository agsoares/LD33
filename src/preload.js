var app = app || {};

app.Preload = function() {};

app.Preload.prototype = {
    preload: function() {
        this.load.image('logo', 'assets/HTML5.png');
        this.load.spritesheet('tileset', 'assets/tileset.png', 32, 32);

    },
    create: function() {
        this.state.start('Game');
    }
};
