var app = app || {};

app.Game = function() {};

var tileID = {
    free    : 0,
    player  : 1,
    enemy   : 2,
    obstacle: 3,
    exit    : 4
};

var turnID = {
  player  : 0,
  enemy   : 1
};

var turn = turnID.player;
var easystar;
var score = 0;
var scorePerKIll = 10;
var heartDropChance = 100;

var map = [];
var tileSize = 32;
var gridSize = { width: 19, height: 19 };

var exit = {x: gridSize.width-1, y: 0 };

var turnTimer = 0;
var maxTurnsToNextWave = Math.floor(Math.sqrt(Math.pow(gridSize.width,2)+Math.pow(gridSize.height,2)));
var waveTimer = Math.floor(Math.sqrt(Math.pow(gridSize.width,2)+Math.pow(gridSize.height,2)));

var playerTotalHealth = 6;
var player =  {
    sprite : {},
    pos : {x:0,y: 0},
    health : playerTotalHealth,
    takeDamage : function(){
        if(this.health > 0){
          this.health--;
          labelLife.text = this.health.toString();
        }
    },
    isDead: function(){
        if(this.health > 0){
          return false;
        }
        return true;
    }
};

var heart = {
  sprite : {},
  pos : {},
  lifespan : 3
};

var labelLife;
var labelScore;
var canSpawnWave = true;
var enemies = [];
var hearts = [];
var background_layer;
var characters_layer;
var hud_layer;


app.Game.prototype = {
    preload: function() {

    },
    returnScreenPos : function (pos) {
        return {
            x: pos.x*tileSize + app.game.width/2   -gridSize.width  *tileSize/2,
            y: pos.y*tileSize + app.game.height/2  -gridSize.height *tileSize/2
        };
    },
    create: function() {
        score = 0;
        player.health = playerTotalHealth;
        player.pos = {x:0,y:0};
        turnTimer = 0;
        canSpawnWave = true;
        turn = turnID.player;
        enemies = [];
        hearts = [];
        background_layer = app.game.add.group();
        foreground_layer = app.game.add.group();
        hud_layer        = app.game.add.group();


        labelLife = app.game.add.text(0, 0, player.health, { font: "bold 32px Arial", fill: "#FFFFFF" });
        hud_layer.add(labelLife);
        labelScore = app.game.add.text(app.game.width-90, 0, score, { font: "bold 32px Arial", fill: "#FFFFFF" });
        labelScore.anchor.x = 0;
        hud_layer.add(labelScore);
        for (i = 0 ; i < gridSize.height; i++ ) {
            map[i] = [];
            for (j = 0 ; j < gridSize.width; j++ ) {
                map[i][j] = tileID.free;
                var pos = this.returnScreenPos({x: j, y: i});
                var tile = app.game.add.sprite(pos.x, pos.y, 'tileset', 6);
                background_layer.add(tile);
            }
        }





        var gridPos = this.returnScreenPos(player.pos);
        map[player.pos.y][player.pos.x] = tileID.player;
        player.sprite = app.game.add.sprite(gridPos.x,gridPos.y, 'tileset', 1);
        foreground_layer.add(player.sprite);

        easystar = new EasyStar.js();
        easystar.setGrid(map);
        easystar.setAcceptableTiles([tileID.free, tileID.enemy]);
        easystar.setTileCost(tileID.free,     5);
        easystar.setTileCost(tileID.player, 100);
        easystar.setTileCost(tileID.enemy, 10);
        easystar.setTileCost(tileID.obstacle, 50);

    },
    spawnWave: function(enemiesQty, playerTileCost, enemyTileCost, obstacleTileCost){
      easystar.setTileCost(tileID.player, playerTileCost);
      easystar.setTileCost(tileID.enemy, enemyTileCost);
      easystar.setTileCost(tileID.obstacle, obstacleTileCost);
      for(i = 0; i < enemiesQty; i++){
        this.spawnEnemy();
      }
      canSpawnWave = false;
    },

    addScore: function(){
      score += scorePerKIll;
      labelScore.text = score.toString();
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
                if (this.pos.x == player.pos.x && this.pos.y == player.pos.y) {
                    this.parent.addScore();
                    this.remove();
                    return;
                }
                if(this.isPlayerOnAdjacentTiles(this.pos)){
                    player.takeDamage();
                    this.parent.checkGameOver();
                } else {
                    easystar.findPath(this.pos.x, this.pos.y, exit.x, exit.y, (function(path) {
                        if (path !== null) {
                            if (path.length > 0) {
                                if(this.parent.canMoveToTile(path[1])){
                                    map[this.pos.y][this.pos.x] = tileID.free;
                                    this.pos.x = path[1].x;
                                    this.pos.y = path[1].y;
                                    map[this.pos.y][this.pos.x] = tileID.enemy;
                                    this.parent.canMoveToTile(this.pos);
                                    var enemyPos = this.parent.returnScreenPos(this.pos);
                                    this.sprite.x = enemyPos.x;
                                    this.sprite.y = enemyPos.y;

                                }
                            } else {
                                player.takeDamage();
                                this.parent.checkGameOver();
                                this.remove();
                            }
                        }
                    }).bind(this));
                    easystar.calculate();
                }
            },
            isPlayerOnAdjacentTiles : function(pos){
                var playerPos = player.pos;
                var distance = ({x: Math.abs(pos.x-player.pos.x), y: Math.abs(pos.y-player.pos.y)});
                if(distance.x + distance.y == 1){
                  return true;
                }
                return false;
            },
            dropHeart: function(){
              var chance = this.parent.randomIntFromInterval(1,100);
              if(chance < heartDropChance){
                heart.sprite = app.game.add.sprite(this.sprite.x,this.sprite.y, 'tileset', 2);
                heart.pos.x = this.pos.x;
                heart.pos.y = this.pos.y;
                hearts.push(heart);
              }
            },
            remove: function () {
                var index = enemies.indexOf(this);
                enemies.splice(index,1);
                this.sprite.destroy();
                if(enemies.length <= 0){
                  canSpawnWave = true;
                }
            }
        };
        var enemyPos = this.returnScreenPos(enemy.pos);
        enemy.sprite = app.game.add.sprite(enemyPos.x,enemyPos.y, 'tileset', 5);

        foreground_layer.add(enemy.sprite);
        enemies.push(enemy);
    },
    isTileOffBoardLimits : function(pos){
      if (pos.x < 0 || pos.x >= gridSize.width) {
          return true;
      }
      if (pos.y < 0 || pos.y >= gridSize.height) {
          return true;
        }
      return false;
    },

    checkGameOver :function(){
      if(player.isDead()){
        player.sprite.destroy();
        this.state.start("GameOver");
      }
    },

    checkEnemy: function (pos) {
        for (i =  0; i < enemies.length; i++) {
            if (enemies[i].pos.x == pos.x && enemies[i].pos.y == pos.y) {
                enemies[i].dropHeart();
                enemies[i].remove();
                return true;
            }
            return false;
        }
    },
    canMoveToTile : function (pos) {
        if (this.isTileOffBoardLimits(pos)) {
            return false;
        }
/**
        if(map[pos.y][pos.x] != tileID.free) {

            return false;
        }
  **/
        return true;
    },
    canAttackTile : function (pos, type) {
        if (this.isTileOffBoardLimits(pos)) {
            return false;
        }

        if(map[pos.y][pos.x] != type) {

            return false;
        }
        return true;
    },
    randomIntFromInterval : function(min,max)
    {
      return Math.floor(Math.random()*(max-min+1)+min);
    },
    update: function() {
        turnTimer-= app.game.time.elapsed/100;
        if(canSpawnWave || waveTimer <= 0){
          enemyQty = this.randomIntFromInterval(1,4);
          p_cost = 500;//this.randomIntFromInterval(50,500);
          e_cost = 100;//this.randomIntFromInterval(10,100);
          o_cost = 0;
          this.spawnWave(enemyQty, 0, p_cost, e_cost, o_cost);
          waveTimer = maxTurnsToNextWave;
        }

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
            if ((player.pos.x != newPos.x || player.pos.y != newPos.y) && this.canMoveToTile(newPos)) {

                turnTimer = 0.75;

                if(this.canAttackTile(newPos,tileID.enemy)) {
                  for (i =  0; i < enemies.length; i++) {
                      if (enemies[i].pos.x == newPos.x && enemies[i].pos.y == newPos.y) {
                          this.addScore();
                          map[newPos.y][newPos.x] = tileID.free;
                          enemies[i].dropHeart();
                          enemies[i].remove();
                      }
                  }

                } else {
                    map[player.pos.y][player.pos.x] = tileID.free;
                    map[newPos.y][newPos.x]         = tileID.player;
                    player.pos = newPos;
                    var gridPos = this.returnScreenPos(player.pos);
                    player.sprite.x = gridPos.x;
                    player.sprite.y = gridPos.y;
                    waveTimer--;

                }
                turn = turnID.enemy;
            }
        }


        if (turn == 1) {
            for (i =  0; i < enemies.length; i++) {
                enemies[i].think();
            }
            turn = turnID.player;
        }
    }
};
