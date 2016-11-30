'use strict';

GameLoop.DEFAULT_SPEED = 500;

function GameLoop () {
    this.speed = GameLoop.DEFAULT_SPEED;
    this.isRunning = false;
    this.universe = null;
    this.loop();
}

GameLoop.prototype.setSpeed = function (speed) {
    this.speed = speed;
}

GameLoop.prototype.start = function () {
    this.isRunning = true;
}

GameLoop.prototype.stop = function () {
    this.isRunning = false;
}

GameLoop.prototype.step = function () {
    if (this.universe !== null) {
        this.universe.nextGeneration();
    }
}

GameLoop.prototype.isRunning = function () {
    return this.isRunning;
}

GameLoop.prototype.loop = function () {
    if (this.isRunning) {
        this.step();
    }
    var self = this;
    window.setTimeout(self.loop.bind(self), self.speed);
}

GameLoop.prototype.setUniverse = function (universe) {
    this.universe = universe;
}
