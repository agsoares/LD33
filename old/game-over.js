var app = app || {};

app.GameOver = function() {};

app.GameOver.prototype = {
    preload: function() {
    },
    create: function() {
      var labelTitle = app.game.add.text(app.game.width/2,app.game.height/2, "SCORE: "+score.toString(), { font: "bold 64px Arial", fill: "#FFFFFF" });
      labelTitle.anchor.x = 0.5;
      labelTitle.anchor.y = 0.5;
    },
    update: function(){
        if (app.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.state.start("Game");
        }
    }
};
