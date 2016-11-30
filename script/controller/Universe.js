'use strict';

function Universe (sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.generationCount = 0;

    this.changeListeners = [];
    this.generationCountListeners = [];

    this.grid = [];
    for (var x = 0; x < sizeX; ++x) {
        this.grid[x] = [];
        for (var y = 0; y < sizeY; ++y) {
            this.grid[x][y] = new Cell();
        }
    }
}

Universe.prototype.nextGeneration = function () {
    for (var x = 0; x < this.sizeX; ++x) {
        for (var y = 0; y < this.sizeY; ++y) {
            var cell = this.grid[x][y];
            var oldStatus = cell.isLiving();
            var around = this.around(x, y);

            var newStatus = this.calculateNextStatus(oldStatus, around);
            cell.setLiving(newStatus, false);

            if (oldStatus !== newStatus) {
                this.updateChangeListeners(x, y, newStatus);
            }

        }
    }

    for (var x = 0; x < this.sizeX; ++x) {
        for (var y = 0; y < this.sizeY; ++y) {
            this.grid[x][y].applyGeneration();
        }
    }
    this.generationCount++;
    this.updateGenerationCountListeners(this.generationCount);
}

Universe.prototype.toggle = function (x, y) {
    if (this.inRange(x, y)) {
        var cell = this.grid[x][y];
        cell.setLiving(!cell.isLiving(), true);
        this.updateChangeListeners(x, y, cell.isLiving());
    }
}

Universe.prototype.around = function (x, y) {
    var count = 0;
    if (this.inRange(x, y)) {
        this.isLiving(x - 1, y - 1) && count++;
        this.isLiving(x, y - 1) && count++;
        this.isLiving(x + 1, y - 1) && count++;
        this.isLiving(x + 1, y) && count++;
        this.isLiving(x + 1, y + 1) && count++;
        this.isLiving(x, y + 1) && count++;
        this.isLiving(x - 1, y + 1) && count++;
        this.isLiving(x - 1, y) && count++;
    }
    return count;
}

Universe.prototype.isLiving = function (x, y) {
    return this.inRange(x, y) && this.grid[x][y].isLiving();
}

Universe.prototype.inRange = function (x, y) {
    var inRange = true;
    inRange &= x >= 0;
    inRange &= x < this.sizeX;
    inRange &= y >= 0;
    inRange &= y < this.sizeY;
    return inRange;
}

Universe.prototype.calculateNextStatus = function (isLiving, around) {
    var nextStatus;
    if (isLiving === true) {
        if (around < 2) {
            nextStatus = false;
        } else if (around === 2 || around === 3) {
            nextStatus = true;
        } else if (around > 3) {
            nextStatus = false
        }
    } else {
        if (around === 3) {
            nextStatus = true;
        } else {
            nextStatus = false;
        }
    }
    return nextStatus;
}

Universe.prototype.getSizeX = function () {
    return this.sizeX;
}

Universe.prototype.getSizeY = function () {
    return this.sizeY;
}

Universe.prototype.getGrid = function () {
    return this.grid;
}

Universe.prototype.addChangeListener = function (listener) {
    this.changeListeners.push(listener);
}

Universe.prototype.removeChangeListener = function (listener) {
    var index = this.changeListeners.indexOf(listener);
    if (index !== -1) {
        this.changeListeners.splice(index, 1);
    }
}

Universe.prototype.updateChangeListeners = function (x, y, isLiving) {
    this.changeListeners.forEach(function (listener) {
        listener(x, y, isLiving);
    });
}

Universe.prototype.addGenerationCountListener = function (listener) {
    this.generationCountListeners.push(listener);
    this.updateGenerationCountListeners(this.generationCount);
}

Universe.prototype.updateGenerationCountListeners = function (generationCount) {
    this.generationCountListeners.forEach(function (listener) {
        listener(generationCount);
    });
}

Universe.prototype.removeGenerationCountListener = function (listener) {
    var index = this.generationCountListeners.indexOf(listener);
    if (index !== -1) {
        this.generationCountListeners.splice(index, 1);
    }
}
