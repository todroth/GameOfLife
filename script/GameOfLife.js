'use strict';

GameOfLife.DEFAULT_SIZE_X = 60;
GameOfLife.DEFAULT_SIZE_Y = 20;

function GameOfLife () {
    this.universe = null;
    this.gameLoop = new GameLoop();
    this.newGameListeners = [];
    this.changeListeners = [];
    this.generationCountListeners = [];

    this.updateChangeListenersCallback = this.updateChangeListeners.bind(this);
    this.updateGenerationCountListenersCallback = this.updateGenerationCountListeners.bind(this);
}

GameOfLife.prototype.newGame = function (sizeX, sizeY) {
    if (this.universe !== null) {
        this.universe.removeChangeListener(this.updateChangeListenersCallback);
        this.universe.removeGenerationCountListener(this.updateGenerationCountListenersCallback);
    }

    this.universe = new Universe(sizeX, sizeY);

    this.universe.addChangeListener(this.updateChangeListenersCallback);
    this.universe.addGenerationCountListener(this.updateGenerationCountListenersCallback);

    this.gameLoop.setUniverse(this.universe);
    this.updateNewGameListeners(sizeX, sizeY);
}

GameOfLife.prototype.getUniverse = function () {
    return this.universe;
}

GameOfLife.prototype.getGameLoop = function () {
    return this.gameLoop;
}

GameOfLife.prototype.addNewGameListener = function (listener) {
    this.newGameListeners.push(listener);
}

GameOfLife.prototype.updateNewGameListeners = function (sizeX, sizeY) {
    this.newGameListeners.forEach(function (listener) {
        listener(sizeX, sizeY);
    });
}

GameOfLife.prototype.addChangeListener = function (listener) {
    this.changeListeners.push(listener);
}

GameOfLife.prototype.updateChangeListeners = function (x, y, isLiving) {
    this.changeListeners.forEach(function (listener) {
        listener(x, y, isLiving);
    });
}

GameOfLife.prototype.addGenerationCountListener = function (listener) {
    this.generationCountListeners.push(listener);
}

GameOfLife.prototype.updateGenerationCountListeners = function (count) {
    this.generationCountListeners.forEach(function (listener) {
        listener(count);
    });
}
