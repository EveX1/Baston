function Monster(monster) {
    Charac.call(this, monster.name, monster.gender, monster.str, monster.end, monster.agi, monster.esq, monster.hp, monster.lvl);
    this.name = monster.name || monster.desc;
    this.esq = monster.esq || monster.agi * 5;
    this.hp = monster.hp || 100 + monster.end * (5 + (monster.lvl - 1));
    this.init = monster.initM;
    this.hpFull = this.hp;
    this.xpValue = Math.pow(this.lvl, 2);
}

Monster.prototype = Object.create(Charac.prototype);
Monster.prototype.constructor = Monster;