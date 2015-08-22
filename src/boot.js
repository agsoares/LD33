var app = app || {};

app.Boot = function() {};

app.Boot.prototype = {
    preload: function() {
    },
    create: function() {
        this.state.start('Preload');
    }
};
