define('config', function() {
  var Config;
  return Config = (function() {
    function Config() {}

    Config.width = 800;

    Config.height = 600;

    Config.tileSize = 32;

    Config.gridSize = {
      width: 19,
      height: 19
    };

    Config.returnScreenPos = function(pos) {
      return {
        x: pos.x * Config.tileSize + Config.width / 2 - Config.gridSize.width * Config.tileSize / 2,
        y: pos.y * Config.tileSize + Config.height / 2 - Config.gridSize.height * Config.tileSize / 2
      };
    };

    return Config;

  })();
});
