'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var gameOfLife = new GameOfLife();
    var configView = new ConfigView(gameOfLife);
    var gameView = new GameView(gameOfLife);
});
