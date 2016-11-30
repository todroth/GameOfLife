'use strict';

function ConfigView (gameOfLife) {
    this.gameOfLife = gameOfLife;
    this.gameLoop = gameOfLife.getGameLoop();

    this.buttonNewGame = document.getElementById('buttonNewGame');
    this.buttonStep = document.getElementById('buttonStep');
    this.buttonStart = document.getElementById('buttonStart');
    this.buttonStop = document.getElementById('buttonStop');
    this.buttonApplySpeed = document.getElementById('buttonApplySpeed');
    this.inputSizeX = document.getElementById('inputSizeX');
    this.inputSizeY = document.getElementById('inputSizeY');
    this.inputSpeed = document.getElementById('inputSpeed');

    this.registerConfigListeners();
}

ConfigView.prototype.registerConfigListeners = function () {
    this.buttonNewGame.addEventListener('click', this.onClickButtonNewGame.bind(this));
    this.buttonStep.addEventListener('click', this.onClickButtonStep.bind(this));
    this.buttonStart.addEventListener('click', this.onClickButtonStart.bind(this));
    this.buttonStop.addEventListener('click', this.onClickButtonStop.bind(this));
    this.buttonApplySpeed.addEventListener('click', this.onClickButtonApplySpeed.bind(this));
}

ConfigView.prototype.onClickButtonNewGame = function () {
    var sizeX = window.parseInt(this.inputSizeX.value);
    var sizeY = window.parseInt(this.inputSizeY.value);
    if (!(window.isNaN(sizeX) || window.isNaN(sizeY) || sizeX < 1 || sizeY < 1)){
        this.gameOfLife.newGame(sizeX, sizeY);
    }
}

ConfigView.prototype.onClickButtonStep = function () {
    this.gameLoop.step();
}

ConfigView.prototype.onClickButtonStart = function () {
    this.gameLoop.start();
}

ConfigView.prototype.onClickButtonStop = function () {
    this.gameLoop.stop();
}

ConfigView.prototype.onClickButtonApplySpeed = function () {
    var speed = window.parseInt(this.inputSpeed.value);
    if (!window.isNaN(speed)) {
        this.gameLoop.setSpeed(speed);
    }
}
