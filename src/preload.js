var app = app || {};

app.Preload = function() {};

app.Preload.prototype = {
    preload: function() {
        this.load.image('logo', 'assets/HTML5.png');
    },
    create: function() {
        this.state.start('Game');
    }
};
