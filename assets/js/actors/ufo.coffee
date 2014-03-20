
{ Vector } = require 'irf'

class Ufo
    constructor: (@keyboard) ->

        @coor = new Vector( 100, 100 )
        @force = {}
        @speed = new Vector()

        @force.right = new Vector( 0.01, 0 )
        @force.left  = new Vector( -0.01, 0 )
        @force.up    = new Vector( 0, -0.01 )
        @force.down  = new Vector( 0, 0.01 )

    update: (delta) ->

        for direction in ['right','left','up','down']
            if @keyboard.key(direction) then @speed.add_ @force[direction]

        @coor.add_ @speed.mult delta

    render: (ctx) ->

        # nothing to render (this UFO is invisible)

module.exports = Ufo


