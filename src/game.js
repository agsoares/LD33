var app = app || {};

app.Game = function() {};

var tileID = {
    free    : 0,
    player  : 1,
    enemy   : 2,
    obstacle: 3,
    exit    : 4
};

var turn = 0;
var easystar;


var map = [];
var tileSize = 32;
var gridSize = { width: 19, height: 19 };

var exit = {x: gridSize.width-1, y: 0 };

var turnTimer = 0;

var player =  {
    sprite : {},
    pos : {x:0,y: 0},
    health: 6,
    takeDamage : function(){
        if(this.health > 0){
          this.health--;
        }
    },
    isDead: function(){
        if(this.health > 0){
          return false;
        }
        return true;
    }
};


var enemies = [];


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
                map[i][j] = tileID.free;
                var pos = this.returnGridPos({x: j, y: i});
                var tile = app.game.add.sprite(pos.x, pos.y, 'tileset', map[i][j]);
            }
        }

        var gridPos = this.returnGridPos(player.pos);
        map[player.pos.y][player.pos.x] = tileID.player;
        player.sprite = app.game.add.sprite(gridPos.x,gridPos.y, 'tileset', 2);

        easystar = new EasyStar.js();
        easystar.setGrid(map);
        easystar.setAcceptableTiles([tileID.free]);
        easystar.setTileCost(tileID.free,     5);
        easystar.setTileCost(tileID.player, 100);

        this.spawnEnemy();
        this.spawnEnemy();
        this.spawnEnemy();

    },
    spawnEnemy: function () {
        var enemy = {
            sprite : {},
            pos : {
                x:0,
                y:Math.floor(Math.random()*(gridSize.height-2))+1
            },
            parent: this,
            think: function () {
                easystar.findPath(this.pos.x, this.pos.y, exit.x, exit.y, (function(path) {
                    if (path !== null) {
                        if (path.length > 0) {
                            if(this.parent.canMoveToTile(path[1])){
                                this.pos.x = path[1].x;
                                this.pos.y = path[1].y;
                                this.parent.canMoveToTile(this.pos);
                                var enemyPos = this.parent.returnGridPos(this.pos);
                                this.sprite.x = enemyPos.x;
                                this.sprite.y = enemyPos.y;
                            }
                        } else {
                            var index = enemies.indexOf(this);
                            enemies.splice(index,1);
                            this.sprite.destroy();
                        }
                    }
                }).bind(this));
                easystar.calculate();
            }
        };
        var enemyPos = this.returnGridPos(enemy.pos);
        enemy.sprite = app.game.add.sprite(enemyPos.x,enemyPos.y, 'tileset', 3);
        enemies.push(enemy);
    },
    canMoveToTile : function (pos) {
        if (pos.x < 0 || pos.x >= gridSize.width) {
            return false;
        }
        if (pos.y < 0 || pos.y >= gridSize.height) {
            return false;
        }
        if(map[pos.y][pos.x] != tileID.free) {

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
                player.takeDamage();
                console.log(player.health);
                console.log(player.isDead());
            } else if (app.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                newPos.y--;
            } else if (app.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                newPos.y++;
            }

            if ((player.pos.x != newPos.x || player.pos.y != newPos.y) && this.canMoveToTile(newPos)) {
                turnTimer = 0.75;
                map[player.pos.y][player.pos.x] = tileID.free;
                map[newPos.y][newPos.x]         = tileID.player;
                player.pos = newPos;
                var gridPos = this.returnGridPos(player.pos);
                player.sprite.x = gridPos.x;
                player.sprite.y = gridPos.y;
                turn = 1;
            }
        }


        if (turn == 1) {
            for (i =  0; i < enemies.length; i++) {
                enemies[i].think();

            }
            turn = 0;
        }
    }
};
