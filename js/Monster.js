function Monster(name, str, end, agi, lvl, initM, options) {
    Charac.call(this, name, str, end, agi, lvl, options);
    this.init = initM;
}

Monster.prototype = Object.create(Charac.prototype);
Monster.prototype.constructor = Monster;