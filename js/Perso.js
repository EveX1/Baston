function Perso(name, str, end, agi, esq, hp) {
    this.name = name;

    this.str = str;
    this.end = end;
    this.agi = agi;
    this.esq = esq;
    this.hp = hp;

}

// random un nombre entre min et max
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// déterminer l'initiative (provisoire)
Perso.prototype.init = function () {
    var init = randomize(0, 10)
    return init;
}

// déterminer si le perso touche et appliquer les dégâts
Perso.prototype.attack = function (target) {
    var hit = Math.floor((Math.random() * 100) + 1) - target.esq;
    if (hit >= 0) {
        var dmg = this.dmgDone(target);
        return [hit, dmg];
    } else {
        return [this.name + " a raté " + target.name, 0];
    }
}

// déterminer les dégâts infligés et les soustraire du pool d'hp de la cible
Perso.prototype.dmgDone = function (target) {
    var dmg = randomize(this.str, this.str * 2);
    target.hp -= dmg;
    return dmg;
}