
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.


jQuery = require 'jquery'
{ EventManager, Keyboard, SceneManager, Game } = require 'irf'

class Asteroids extends Game

    constructor: (params) ->
        super params
        @eventManager = new EventManager
        @keyboard = new Keyboard

        @sceneManager.setScene "SceneJumpNRun", this

    update: ->
        super()
        @sceneManager.currentScene.update @timer.delta

    render: ->
        super()
        @sceneManager.currentScene.render @ctx
        @ctx.fillText( @timer.fps().toFixed(1), @width - 50, 20 )


jQuery ->
    asteroids = new Asteroids
        "width" : 800
        "height": 600
    .start()


Asteroids.addScene require './scenes/bigbackground.coffee'
Asteroids.addScene require './scenes/height.coffee'
Asteroids.addScene require './scenes/iso.coffee'
Asteroids.addScene require './scenes/jumpnrun.coffee'
Asteroids.addScene require './scenes/maze.coffee'
