function Perso(name) {
    this.name = name;

    this.str = 0;
    this.end = 0;
    this.agi = 0;
    this.esq = this.agi * 5;
    this.HP = 100 + this.end * 5;

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

// déterminer les dégâts infligés et les soustraire du pool d'HP de la cible
Perso.prototype.dmgDone = function (target) {
    var dmg = randomize(this.str, this.str * 2);
    target.HP -= dmg;
    return dmg;
}