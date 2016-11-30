'use strict';

function Cell () {
    this.currentStatus = false;
    this.nextStatus = false;
}

Cell.prototype.setLiving = function (living, now) {
    if (now === true) {
        this.currentStatus = living;
    } else {
        this.nextStatus = living;
    }
}

Cell.prototype.isLiving = function () {
    return this.currentStatus === true;
}

Cell.prototype.applyGeneration = function () {
    this.currentStatus = this.nextStatus;
    this.nextStatus = false;
}
