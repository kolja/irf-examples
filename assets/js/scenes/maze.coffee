
{ Scene, Camera, Sprite, Map } = require 'irf'
Ufo = require '../actors/ufo.coffee'

class SceneMaze extends Scene

    constructor: (@parent) ->
        @camera = new Camera {"projection": "normal", "vpWidth": @parent.params.width, "vpHeight": @parent.params.height}
        @ufo = new Ufo @parent.keyboard
        maze = new Sprite
            "texture": "images/walls.png"
            "width": 100
            "height": 100
            "innerWidth": 50
            "innerHeight": 50
            "key":
                "dddddddd": 0
                "dd00dddd": 1
                "dddd00dd": 2
                "dddddd00": 3
                "00dddddd": 4
                "00000000": 5
                "00dddd00": 6
                "0000dddd": 7
                "dd0000dd": 8
                "dddd0000": 9
                "00dd00dd": 12
                "dd00dd00": 13
                "00dd0000": 14
                "0000dd00": 15
                "000000dd": 16
                "dd000000": 17

        @background = new Map
            "mapFile": "maps/maze.png"
            "pattern": "cross"
            "sprite": maze
            "ed": @parent.eventManager

    update: (delta) ->
        @ufo.update(delta, @background)
        @camera.coor = @ufo.coor

    render: (ctx) ->
        @camera.apply ctx, =>
            @background.render(ctx, @camera)
            @ufo.render(ctx)


module.exports = SceneMaze
