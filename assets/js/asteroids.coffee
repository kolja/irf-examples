
# Main Game Controller / Root entry point
# Adjustments you make here will affect your whole Game.

@astr ?= {}

{ EventManager, Keyboard, SceneManager, Game } = @irf

class Asteroids extends Game

  constructor: (width, height) ->
    super width, height

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
  asteroids = new Asteroids(800, 600)
  asteroids.start()


@astr.Asteroids = Asteroids