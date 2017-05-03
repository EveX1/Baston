function Charac(name, gender, str, end, agi, esq, hp, lvl) {
    this.name = name;
    this.gender = gender;
    this.str = str;
    this.end = end;
    this.agi = agi;
    this.esq = esq;
    this.hp = hp;
    this.hpFull = hp;
    this.lvl = lvl;
    this.skills = {
        NormalAttack,
        HeavyStrike
    };
}

// déterminer l'initiative (provisoire)
Charac.prototype.init = function () {
    var init = randomize(0, 10);
    return init;
}