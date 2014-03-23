
{ Scene, Camera, Sprite, Map } = require 'irf'
Ufo = require '../actors/ufo.coffee'

class SceneHexagon extends Scene

    constructor: (@parent) ->

        @camera = new Camera
            projection: "normal"
            vpWidth: @parent.params.width
            vpHeight: @parent.params.height

        @ufo = new Ufo @parent.keyboard

        hexagon = new Sprite
            "texture": "images/hexagon.png"
            "width": 100
            "height": 100
            "innerWidth": 53
            "innerHeight": 45
            "key":
                A: 0
                B: 1
                C: 2

        @background = new Map
            mapFile:
                width: 12
                height: 12
                0: [["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"]]
                1: [["A"],["B"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"]]
                2: [["A"],["B"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"]]
                3: [["A"],["B"],["B"],["A"],["A"],["A"],["C"],["A"],["A"],["A"],["A"],["A"]]
                4: [["A"],["A"],["B"],["A"],["A"],["A"],["C"],["C"],["A"],["A"],["A"],["A"]]
                5: [["A"],["A"],["B"],["A"],["B"],["A"],["A"],["A"],["A"],["A"],["A"],["A"]]
                6: [["A"],["A"],["B"],["B"],["A"],["B"],["A"],["A"],["A"],["A"],["A"],["A"]]
                7: [["A"],["C"],["A"],["A"],["A"],["B"],["A"],["C"],["A"],["A"],["A"],["A"]]
                8: [["C"],["C"],["A"],["A"],["B"],["B"],["A"],["A"],["B"],["B"],["A"],["A"]]
                9: [["C"],["A"],["A"],["A"],["B"],["A"],["A"],["B"],["A"],["B"],["A"],["A"]]
                10: [["A"],["A"],["A"],["A"],["B"],["B"],["B"],["A"],["A"],["B"],["B"],["A"]]
                11: [["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["A"],["B"],["A"]]
            read: "literal"
            pattern: "simple"
            tilePlacement: "hexagon"
            sprite: hexagon
            ed: @parent.eventManager

    update: (delta) ->
        @ufo.update(delta, @background)
        @camera.coor = @ufo.coor

    render: (ctx) ->
        @camera.apply ctx, =>
            @background.render(ctx, @camera)
            @ufo.render(ctx)


module.exports = SceneHexagon
