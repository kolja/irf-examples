
{ Scene, Camera, Sprite, Map } = require 'irf'
Ufo = require '../actors/ufo.coffee'

class SceneHexagon extends Scene

    constructor: (@parent) ->

        @camera = new Camera {"projection": "normal", "vpWidth": @parent.params.width, "vpHeight": @parent.params.height}
        @ufo = new Ufo @parent.keyboard

        hexagon = new Sprite
            "texture": "images/hexagon.png"
            "width": 100
            "height": 100
            "innerWidth": 53
            "innerHeight": 45
            "key":
                "00": 0
                "bb": 1
                "ee": 2

        @background = new Map
            mapFile: "/maps/hexmap.png"
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
