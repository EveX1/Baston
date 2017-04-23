function Charac(name, gender, str, end, agi, esq, hp, lvl) {
    this.name = name;
    this.gender = gender;
    this.str = str;
    this.end = end;
    this.agi = agi;
    this.esq = esq;
    this.hp = hp;
    this.lvl = lvl;
    this.skills = { NormalAttack, HeavyStrike }
}

// random un nombre entre min et max
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// déterminer l'initiative (provisoire)
Charac.prototype.init = function() {
    var init = randomize(0, 10)
    return init;
}

// déterminer les dégâts infligés et les soustraire du pool d'hp de la cible
Charac.prototype.dmgDone = function(target) {
    var dmg = randomize(this.str, this.str * 2);
    // on enlève les dégats aux PV de la cible
    target.hp -= dmg;
    return dmg;
}
