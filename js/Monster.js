function Monster(name, str, end, agi, initM, esq, hp, xp, lvl) {
    Charac.call(this, name, str, end, agi, esq, hp, xp, lvl);
    this.init = initM;
}

Monster.prototype = Object.create(Charac.prototype);
Monster.prototype.constructor = Monster;