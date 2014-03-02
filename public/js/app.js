(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BoundingBox, Hero, Sprite, Vector, _ref;

_ref = require('irf'), Sprite = _ref.Sprite, Vector = _ref.Vector, BoundingBox = _ref.BoundingBox;

Hero = (function() {
  function Hero(eventManager, keyboard) {
    this.eventManager = eventManager;
    this.keyboard = keyboard;
    this.state = "normal";
    this.sprite = new Sprite({
      "texture": "images/test.png",
      "width": 50,
      "height": 50,
      "key": {
        "normal": 3,
        "jumping": 5
      }
    });
    this.coor = new Vector(100, 100);
    this.speed = new Vector(0, 0);
    this.force = new Vector(0.01, 0);
    this.gravity = new Vector(0, 0.01);
    this.bb = new BoundingBox(this.coor, new Vector(50, 50));
    this.bb.color = "red";
    this.eventManager.register("touchdown", this.touchdown);
  }

  Hero.prototype.touchdown = function() {
    return console.log("Hero says: Touchdown occurred");
  };

  Hero.prototype.update = function(delta, map) {
    var tileBelow;
    tileBelow = map.tileAtVector(this.coor).neighbor["s"];
    this.speed.add_(this.gravity);
    if (this.bb.intersect(tileBelow.bb) && !(typeof tileBelow.isWalkable === "function" ? tileBelow.isWalkable() : void 0)) {
      this.speed.y = 0;
      this.state = "normal";
    }
    if (this.keyboard.key("right")) {
      this.speed.add_(this.force);
    } else if (this.keyboard.key("left")) {
      this.speed.subtract_(this.force);
    } else {
      if (this.speed.x > 0) {
        this.speed.subtract_(this.force);
      } else {
        this.speed.add_(this.force);
      }
    }
    if (this.keyboard.key("space") && this.state !== "jumping") {
      this.state = "jumping";
      this.speed.y = -0.7;
    }
    this.coor = this.coor.add(this.speed.mult(delta));
    return this.bb.coor = this.coor;
  };

  Hero.prototype.render = function(ctx) {
    ctx.save();
    ctx.translate(this.coor.x, this.coor.y);
    this.sprite.render(this.state, ctx);
    ctx.restore();
    return this.bb.render(ctx);
  };

  return Hero;

})();

module.exports = Hero;


},{}],2:[function(require,module,exports){
var Spaceship, Sprite, Vector, _ref;

_ref = require('irf'), Vector = _ref.Vector, Sprite = _ref.Sprite;

Spaceship = (function() {
  function Spaceship(eventManager, keyboard) {
    this.eventManager = eventManager;
    this.keyboard = keyboard;
    this.state = "normal";
    this.sprite = new Sprite({
      "texture": "/images/test.png",
      "width": 50,
      "height": 50
    });
    this.sprite.addImage("normal", Math.floor(Math.random() * 10));
    this.coor = new Vector(Math.random() * 1024, Math.random() * 768);
    this.speed = new Vector(0.1, 0.1);
    if (Math.random() > 0.5) {
      this.speed = this.speed.mult(-1);
    }
  }

  Spaceship.prototype.update = function(delta) {
    this.coor = this.coor.add(this.speed.mult(delta));
    if (this.coor.x > 1024) {
      this.speed.x = this.speed.x * -1;
      this.coor.x = 1024;
      this.eventManager.trigger("touchdown");
    }
    if (this.coor.x < 0) {
      this.speed.x = this.speed.x * -1;
      this.coor.x = 0;
    }
    if (this.coor.y > 768) {
      this.speed.y = this.speed.y * -1;
      this.coor.y = 768;
    }
    if (this.coor.y < 0) {
      this.speed.y = this.speed.y * -1;
      return this.coor.y = 0;
    }
  };

  Spaceship.prototype.touchdown = function() {
    return console.log("Spaceship says: Touchdown");
  };

  Spaceship.prototype.render = function(ctx) {
    ctx.save();
    ctx.translate(this.coor.x, this.coor.y);
    this.sprite.render(this.state, ctx);
    return ctx.restore();
  };

  Spaceship.prototype.hello = function() {
    return console.log("hello!");
  };

  return Spaceship;

})();

module.exports = Spaceship;


},{}],3:[function(require,module,exports){
var Ufo, Vector;

Vector = require('irf').Vector;

Ufo = (function() {
  function Ufo(keyboard) {
    this.keyboard = keyboard;
    this.coor = new Vector(100, 100);
    this.force = {};
    this.speed = new Vector();
    this.force.right = new Vector(0.01, 0);
    this.force.left = new Vector(-0.01, 0);
    this.force.up = new Vector(0, -0.01);
    this.force.down = new Vector(0, 0.01);
  }

  Ufo.prototype.update = function(delta, map) {
    var direction, _i, _len, _ref;
    _ref = ['right', 'left', 'up', 'down'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      direction = _ref[_i];
      if (this.keyboard.key(direction)) {
        this.speed.add_(this.force[direction]);
      }
    }
    return this.coor.add_(this.speed.mult(delta));
  };

  Ufo.prototype.render = function(ctx) {};

  return Ufo;

})();

module.exports = Ufo;


},{}],4:[function(require,module,exports){
var Asteroids, EventManager, Game, Keyboard, SceneManager, jQuery, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

jQuery = require('jquery');

_ref = require('irf'), EventManager = _ref.EventManager, Keyboard = _ref.Keyboard, SceneManager = _ref.SceneManager, Game = _ref.Game;

Asteroids = (function(_super) {
  __extends(Asteroids, _super);

  function Asteroids(params) {
    Asteroids.__super__.constructor.call(this, params);
    this.eventManager = new EventManager;
    this.keyboard = new Keyboard;
    this.sceneManager.setScene("SceneJumpNRun", this);
  }

  Asteroids.prototype.update = function() {
    Asteroids.__super__.update.call(this);
    return this.sceneManager.currentScene.update(this.timer.delta);
  };

  Asteroids.prototype.render = function() {
    Asteroids.__super__.render.call(this);
    this.sceneManager.currentScene.render(this.ctx);
    return this.ctx.fillText(this.timer.fps().toFixed(1), this.width - 50, 20);
  };

  return Asteroids;

})(Game);

jQuery(function() {
  var asteroids;
  return asteroids = new Asteroids({
    "width": 800,
    "height": 600
  }).start();
});

Asteroids.addScene(require('./scenes/bigbackground.coffee'));

Asteroids.addScene(require('./scenes/height.coffee'));

Asteroids.addScene(require('./scenes/iso.coffee'));

Asteroids.addScene(require('./scenes/jumpnrun.coffee'));

Asteroids.addScene(require('./scenes/maze.coffee'));


},{"./scenes/bigbackground.coffee":5,"./scenes/height.coffee":6,"./scenes/iso.coffee":7,"./scenes/jumpnrun.coffee":8,"./scenes/maze.coffee":9}],5:[function(require,module,exports){
var Background, Scene, SceneBigBackground, SceneManager, Spaceship, Sprite, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('irf'), Sprite = _ref.Sprite, Background = _ref.Background, Scene = _ref.Scene, SceneManager = _ref.SceneManager;

Spaceship = require('../actors/spaceship.coffee');

SceneBigBackground = (function(_super) {
  __extends(SceneBigBackground, _super);

  function SceneBigBackground(parent) {
    var backgroundsprite, i, _i;
    this.parent = parent;
    backgroundsprite = new Sprite({
      "texture": "images/weltraum.jpg",
      "width": 500,
      "height": 500
    });
    this.background = new Background(backgroundsprite);
    this.spaceships = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      this.spaceships[i] = new Spaceship(this.parent.eventManager);
    }
  }

  SceneBigBackground.prototype.update = function(delta) {
    var spaceship, _i, _len, _ref1, _results;
    _ref1 = this.spaceships;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      spaceship = _ref1[_i];
      _results.push(spaceship.update(delta));
    }
    return _results;
  };

  SceneBigBackground.prototype.render = function(ctx) {
    var spaceship, _i, _len, _ref1, _results;
    ctx.save();
    ctx.translate(250, 250);
    this.background.render(ctx);
    ctx.restore();
    _ref1 = this.spaceships;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      spaceship = _ref1[_i];
      _results.push(spaceship.render(ctx));
    }
    return _results;
  };

  return SceneBigBackground;

})(Scene);

module.exports = SceneBigBackground;


},{"../actors/spaceship.coffee":2}],6:[function(require,module,exports){
var Camera, Map, Scene, SceneHeight, SceneManager, Sprite, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('irf'), Scene = _ref.Scene, SceneManager = _ref.SceneManager, Sprite = _ref.Sprite, Map = _ref.Map, Camera = _ref.Camera;

SceneHeight = (function(_super) {
  __extends(SceneHeight, _super);

  function SceneHeight(parent) {
    var simple;
    this.parent = parent;
    simple = new Sprite({
      "texture": "images/beach3d.png",
      "width": 107,
      "height": 107,
      "innerWidth": 87,
      "innerHeight": 87,
      "key": {
        "00": 12,
        "dd": 12
      }
    });
    this.background = new Map({
      "mapfile": "maps/minimap.png",
      "pattern": "simple",
      "sprite": simple
    });
    this.camera = new Camera({
      "projection": "normal",
      "vpWidth": this.parent.params.width,
      "vpHeight": this.parent.params.height
    });
  }

  SceneHeight.prototype.update = function(delta) {};

  SceneHeight.prototype.render = function(ctx) {
    return this.background.render(ctx, this.camera);
  };

  return SceneHeight;

})(Scene);

module.exports = SceneHeight;


},{}],7:[function(require,module,exports){
var Camera, Map, Scene, SceneIso, Sprite, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('irf'), Camera = _ref.Camera, Sprite = _ref.Sprite, Scene = _ref.Scene, Map = _ref.Map;

SceneIso = (function(_super) {
  __extends(SceneIso, _super);

  function SceneIso(parent) {
    var beach3d;
    this.parent = parent;
    this.camera = new Camera({
      "projection": "iso",
      "vpWidth": this.parent.params.width,
      "vpHeight": this.parent.params.height
    });
    beach3d = new Sprite({
      "texture": "images/beach3d.png",
      "width": 107,
      "height": 107,
      "innerWidth": 87,
      "innerHeight": 87,
      "key": {
        "dd00dddd": 0,
        "00dddddd": 1,
        "dddd00dd": 2,
        "dddddd00": 3,
        "dd00dd00": 4,
        "0000dddd": 5,
        "00dd00dd": 6,
        "dddd0000": 7,
        "0000dd00": 8,
        "000000dd": 9,
        "00dd0000": 10,
        "dd000000": 11,
        "dddddddd": 12,
        "00000000": 13,
        "dd0000dd": 14,
        "00dddd00": 15
      }
    });
    this.background = new Map({
      "mapfile": "maps/map.png",
      "pattern": "square",
      "sprite": beach3d
    });
  }

  SceneIso.prototype.update = function(delta) {};

  SceneIso.prototype.render = function(ctx) {
    var _this = this;
    return this.camera.apply(ctx, function() {
      return _this.background.render(ctx, _this.camera);
    });
  };

  return SceneIso;

})(Scene);

module.exports = SceneIso;


},{}],8:[function(require,module,exports){
var Camera, Hero, Map, Scene, SceneJumpNRun, Spaceship, Sprite, Tile, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('irf'), Camera = _ref.Camera, Scene = _ref.Scene, Sprite = _ref.Sprite, Tile = _ref.Tile, Map = _ref.Map;

Hero = require('../actors/hero.coffee');

Spaceship = require('../actors/spaceship.coffee');

SceneJumpNRun = (function(_super) {
  __extends(SceneJumpNRun, _super);

  function SceneJumpNRun(parent) {
    var customReadFunction, i, jumpnrunSprite, _i;
    this.parent = parent;
    this.hero = new Hero(this.parent.eventManager, this.parent.keyboard);
    this.camera = new Camera({
      "projection": "normal",
      "vpWidth": this.parent.params.width,
      "vpHeight": this.parent.params.height
    });
    jumpnrunSprite = new Sprite({
      "texture": "images/jumpnrun.png",
      "width": 100,
      "height": 100,
      "innerWidth": 95,
      "innerHeight": 95,
      "key": {
        "00": 0,
        "11": 1,
        '22': 2,
        "33": 3,
        "44": 4,
        '55': 5,
        "66": 6,
        "77": 7,
        '88': 8,
        "99": 9,
        "aa": 10,
        "bb": 11
      }
    });
    customReadFunction = function() {
      var col, green, row, type, z, _i, _ref1, _results;
      _results = [];
      for (row = _i = 0, _ref1 = this.map.height - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; row = 0 <= _ref1 ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref2, _results1;
          _results1 = [];
          for (col = _j = 0, _ref2 = this.map.width - 1; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; col = 0 <= _ref2 ? ++_j : --_j) {
            type = "" + this.mapData[row][col][0];
            green = parseInt(this.mapData[row][col][1], 16);
            z = parseInt(this.mapData[row][col][2], 16);
            _results1.push(this.tiles.push(new Tile(this.sprite, type, row, col, green, z)));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };
    this.background = new Map({
      "mapfile": "/maps/jumpnrun_map.png",
      "pattern": customReadFunction,
      "sprite": jumpnrunSprite
    });
    this.spaceships = [];
    for (i = _i = 0; _i <= 3; i = ++_i) {
      this.spaceships[i] = new Spaceship(this.parent.eventManager, this.parent.keyboard);
    }
  }

  SceneJumpNRun.prototype.update = function(delta) {
    var spaceship, _i, _len, _ref1, _results;
    this.hero.update(delta, this.background);
    this.camera.coor = this.hero.coor;
    _ref1 = this.spaceships;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      spaceship = _ref1[_i];
      _results.push(spaceship.update(delta));
    }
    return _results;
  };

  SceneJumpNRun.prototype.render = function(ctx) {
    var _this = this;
    return this.camera.apply(ctx, function() {
      var spaceship, _i, _len, _ref1, _results;
      _this.background.render(ctx, _this.camera);
      _this.hero.render(ctx);
      _ref1 = _this.spaceships;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        spaceship = _ref1[_i];
        _results.push(spaceship.render(ctx));
      }
      return _results;
    });
  };

  return SceneJumpNRun;

})(Scene);

module.exports = SceneJumpNRun;


},{"../actors/hero.coffee":1,"../actors/spaceship.coffee":2}],9:[function(require,module,exports){
var Camera, Map, Scene, SceneMaze, Sprite, Ufo, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ref = require('irf'), Scene = _ref.Scene, Camera = _ref.Camera, Sprite = _ref.Sprite, Map = _ref.Map;

Ufo = require('../actors/ufo.coffee');

SceneMaze = (function(_super) {
  __extends(SceneMaze, _super);

  function SceneMaze(parent) {
    var maze;
    this.parent = parent;
    this.camera = new Camera({
      "projection": "normal",
      "vpWidth": this.parent.params.width,
      "vpHeight": this.parent.params.height
    });
    this.ufo = new Ufo(this.parent.keyboard);
    maze = new Sprite({
      "texture": "images/walls.png",
      "width": 100,
      "height": 100,
      "innerWidth": 50,
      "innerHeight": 50,
      "key": {
        "dddddddd": 0,
        "dd00dddd": 1,
        "dddd00dd": 2,
        "dddddd00": 3,
        "00dddddd": 4,
        "00000000": 5,
        "00dddd00": 6,
        "0000dddd": 7,
        "dd0000dd": 8,
        "dddd0000": 9,
        "00dd00dd": 12,
        "dd00dd00": 13,
        "00dd0000": 14,
        "0000dd00": 15,
        "000000dd": 16,
        "dd000000": 17
      }
    });
    this.background = new Map({
      "mapfile": "maps/maze.png",
      "pattern": "cross",
      "sprite": maze
    });
  }

  SceneMaze.prototype.update = function(delta) {
    this.ufo.update(delta, this.background);
    return this.camera.coor = this.ufo.coor;
  };

  SceneMaze.prototype.render = function(ctx) {
    var _this = this;
    return this.camera.apply(ctx, function() {
      _this.background.render(ctx, _this.camera);
      return _this.ufo.render(ctx);
    });
  };

  return SceneMaze;

})(Scene);

module.exports = SceneMaze;


},{"../actors/ufo.coffee":3}]},{},[4])