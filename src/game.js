var app = app || {};

app.Game = function() {};

var map = [];
var tileSize = 32;
var gridSize = { width: 16, height: 17 };

var turnTimer = 0;

var player =  {
    sprite : {},
    pos : {x:0,y: 0}
};


app.Game.prototype = {
    preload: function() {

    },
    returnGridPos : function (pos) {
        return {
            x: pos.x*tileSize + app.game.width/2   -gridSize.width  *tileSize/2,
            y: pos.y*tileSize + app.game.height/2  -gridSize.height *tileSize/2
        };
    },
    create: function() {
        for (i = 0 ; i < gridSize.height; i++ ) {
            map[i] = [];
            for (j = 0 ; j < gridSize.width; j++ ) {
                map[i][j] = 0;
                var pos = this.returnGridPos({x: j, y: i});
                var tile = app.game.add.sprite(pos.x, pos.y, 'tileset', map[i][j]);
            }
        }

        var gridPos = this.returnGridPos(player.pos);
        player.sprite = app.game.add.sprite(gridPos.x,gridPos.y, 'tileset', 2);

    },
    canMoveToTile : function (pos) {
        if (pos.x < 0 || pos.x >= gridSize.width) {
            return false;
        }
        if (pos.y < 0 || pos.y >= gridSize.height) {
            return false;
        }
        return true;
    },
    update: function() {

        turnTimer-= app.game.time.elapsed/100;
        if (turnTimer <= 0 ) {
            var newPos = { x: player.pos.x, y: player.pos.y };
            if (app.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                newPos.x--;

            } else if (app.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                newPos.x++;

            } else if (app.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                newPos.y--;

            } else if (app.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                newPos.y++;
            }

            if (this.canMoveToTile(newPos) && (player.pos.x != newPos.x || player.pos.y != newPos.y)) {
                console.log("wut");
                turnTimer = 0.75;
                player.pos = newPos;
                var gridPos = this.returnGridPos(player.pos);
                player.sprite.x = gridPos.x;
                player.sprite.y = gridPos.y;
            }
        }
    }
};
