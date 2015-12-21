define 'config', () ->
  class Config
    @width   = 800
    @height  = 600

    @tileSize = 32
    @gridSize =
      width:  19
      height: 19

    @returnScreenPos: (pos) =>
      return {
        x: pos.x*@tileSize + @width/2   -@gridSize.width  *@tileSize/2,
        y: pos.y*@tileSize + @height/2  -@gridSize.height *@tileSize/2
      }
