
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.


jQuery = require 'jquery'
{ EventManager, Keyboard, SceneManager, Game } = require 'irf'

class Asteroids extends Game

    constructor: (params) ->
        super params
        @eventManager = new EventManager
        @keyboard = new Keyboard

        @sceneManager.setScene "SceneHexagon", this

    update: (delta) ->
        super(delta)
        @fps = (1000/delta).toFixed(1)
        @sceneManager.currentScene.update delta

    render: ->
        super()
        @sceneManager.currentScene.render @ctx
        @ctx.fillText( @fps, @params.width - 50, 20 )


jQuery ->
    asteroids = new Asteroids
        "width" : 800
        "height": 600

    asteroids.eventManager.on "map.finishedLoading", ->
        asteroids.start()

Asteroids.addScene require './scenes/bigbackground.coffee'
Asteroids.addScene require './scenes/height.coffee'
Asteroids.addScene require './scenes/iso.coffee'
Asteroids.addScene require './scenes/jumpnrun.coffee'
Asteroids.addScene require './scenes/maze.coffee'
Asteroids.addScene require './scenes/hexagon.coffee'
