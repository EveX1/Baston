function Monster(name, str, end, agi, initM, esq, hp) {
    Charac.call(this, name, str, end, agi, esq, hp);
    this.init = initM;
    console.log(this.name);
}

Monster.prototype = Object.create(Charac.prototype);
Monster.prototype.constructor = Monster;