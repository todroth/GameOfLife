'use strict';

function GameView (gameOfLife) {
    this.gameOfLife = gameOfLife;

    gameOfLife.addNewGameListener(this.onNewGame.bind(this));
    gameOfLife.addChangeListener(this.onChange.bind(this));
    gameOfLife.addGenerationCountListener(this.onGenerationCount.bind(this));

    this.mousedownCellCallback = this.onMousedownCell.bind(this);
    this.mouseOverCellCallback = this.onMouseOverCell.bind(this);

    this.gameElement = document.getElementById('game');
    this.generationCountElement = document.getElementById('generationCount');

    this.isMouseDown = false;
    var body = document.getElementsByTagName('body')[0];
    body.addEventListener('mousedown', function () {
        this.isMouseDown = true;
    }.bind(this));
    body.addEventListener('mouseup', function () {
            this.isMouseDown = false;
    }.bind(this));

}

GameView.prototype.onNewGame = function (sizeX, sizeY) {
    this.clearGame();
    var cellWidth = 100 / sizeX;
    var cellHeight = 100 / sizeY;

    for (var x = 0; x < sizeX; ++x) {
        var row = document.createElement('div');
        row.classList.add('row');
        this.gameElement.appendChild(row);
        for (var y = 0; y < sizeY; ++y) {
            var cell = document.createElement('div');
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.classList.add('cell');
            cell.classList.add('dead');
            row.appendChild(cell);
            cell.addEventListener('mousedown', this.mousedownCellCallback);
            cell.addEventListener('mouseover', this.mouseOverCellCallback);
        }
    }

}

GameView.prototype.onChange = function (x, y, isLiving) {
    var cells = this.gameElement.querySelectorAll('[data-x="' + x + '"]');
    var cell;
    for (var i = 0; i < cells.length; ++i) {
        if (cells[i].dataset.y == y) {
            cell = cells[i];
            break;
        }
    }
    if (isLiving === true) {
        cell.classList.remove('dead');
        cell.classList.add('living');
    } else {
        cell.classList.remove('living');
        cell.classList.add('dead');
    }

}

GameView.prototype.onMousedownCell = function (event) {
    var cell = event.target;
    var x = cell.dataset.x;
    var y = cell.dataset.y;
    this.gameOfLife.getUniverse().toggle(x, y);
}

GameView.prototype.clearGame = function () {
    while (this.gameElement.firstChild) {
        while (this.gameElement.firstChild.firstChild) {
            var cell = this.gameElement.firstChild.firstChild;
            cell.removeEventListener('mousedown', this.mousedownCellCallback);
            cell.removeEventListener('mouseover', this.mouseOverCellCallback);
            this.gameElement.firstChild.removeChild(cell);
        }
        this.gameElement.removeChild(this.gameElement.firstChild);
    }
}

GameView.prototype.onGenerationCount = function (count) {
    this.generationCountElement.innerHTML = count.toString();
}

GameView.prototype.onMouseOverCell = function (event) {
    if (this.isMouseDown) {
        var cell = event.target;
        var x = cell.dataset.x;
        var y = cell.dataset.y;
        this.gameOfLife.getUniverse().toggle(x, y);
    }
}
