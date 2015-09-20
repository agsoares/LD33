var app = app || {};

app.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

app.game.state.add('Boot',    app.Boot);
app.game.state.add('Preload', app.Preload);
app.game.state.add('Menu',app.Menu);
app.game.state.add('Game',    app.Game);
app.game.state.add('GameOver',app.GameOver);


app.game.state.start('Boot');
