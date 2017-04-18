function Monster(name, str, end, agi, esq, hp, lvl, initM) {
    Charac.call(this, name, str, end, agi, esq, hp, lvl);
    this.init = initM;
    this.xpValue = Math.pow(this.lvl, 2);
}

Monster.prototype = Object.create(Charac.prototype);
Monster.prototype.constructor = Monster;