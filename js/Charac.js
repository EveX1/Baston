function Charac(name, str, end, agi, esq, hp, lvl) {
    this.name = name;
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

// déterminer si le perso touche et appliquer les dégâts
Charac.prototype.attack = function(target) {
    // hit = valeur entre 0 et 100 - esquive de la cible
    var hit = randomize(0, 100) - target.esq;
    // si l'attaquant touche
    if (hit >= 0) {
        // si le hit est supérieur à 90, coup critique (dmg*2)
        if (hit >= 90) {
            var dmg = this.dmgDone(target) * 2;
            console.warn("Coup critique !");
            // sinon dégâts normaux
        } else {
            var dmg = this.dmgDone(target);
        }
        return [hit, dmg];
        // sinon le coup rate
    } else {
        return [this.name + " a raté " + target.name, 0];
    }
}

// déterminer les dégâts infligés et les soustraire du pool d'hp de la cible
Charac.prototype.dmgDone = function(target) {
    var dmg = randomize(this.str, this.str * 2);
    // on enlève les dégats aux PV de la cible
    target.hp -= dmg;
    return dmg;
}

// affichage des résultats de chaque manche (provisoirement en console.log())
Charac.prototype.log = function(target) {
    console.log(this.name + ' à touché ' + target.name + ' avec ' + hit + ' de précision');
    console.log(this.name + ' a infligé ' + dmg + ' points de dégats à ' + target.name);
    // si la cible n'a plus de PV
    if (target.hp <= 0) {
        console.warn(target.name + " est mort(e), " + this.name + " a gagné !");
    } else {
        console.log('Il reste ' + target.hp + ' PV à ' + target.name);
    }
}

// // fonction de condition de victoire intégrée à l'attaque (provisoire)
// Charac.prototype.victory = function(target) {
//     if (target.hp <= 0) {
//         console.warn(target.name + " est mort(e), " + this.name + " a gagné !");
//     }
// }