function Charac(name, str, end, agi, esq, hp) {
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
Charac.prototype.init = function() {
    var init = randomize(0, 10)
    return init;
}

// déterminer si le perso touche et appliquer les dégâts
Charac.prototype.attack = function(target) {
    var hit = Math.floor((Math.random() * 100) + 1) - target.esq;
    if (hit >= 0) {
        var dmg = this.dmgDone(target);
        return [hit, dmg];
    } else {
        return [this.name + " a raté " + target.name, 0];
    }
}

// déterminer les dégâts infligés et les soustraire du pool d'hp de la cible
Charac.prototype.dmgDone = function(target) {
    var dmg = randomize(this.str, this.str * 2);
    target.hp -= dmg;
    return dmg;
}

Charac.prototype.log = function(target) {
    console.log(this.name + ' à touché ' + target.name + ' avec ' + hit + ' de précision');
    console.log(this.name + ' a infligé ' + dmg + ' points de dégats à ' + target.name);
    console.log('Il reste ' + target.hp + ' PV à ' + target.name);
}

// fonction de condition de victoire intégrée à l'attaque (provisoire)
Charac.prototype.victory = function(target) {
    if (target.hp <= 0) {
        console.warn(target.name + " est mort(e), " + this.name + " a gagné !");
    }
};