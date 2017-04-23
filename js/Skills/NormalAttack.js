function NormalAttack(char, target) {
    this.char = char;
    this.target = target;
    this.hit = randomize(0, 100) - this.target.esq;
    this.dmg = randomize(this.char.str, this.char.str * 2);
    this.dmgDone = 0;
}

// déterminer si l'attaquant touche et appliquer les dégâts
NormalAttack.prototype.attack = function() {
    // si l'attaquant touche
    if (this.hit > 0) {
        // si le hit est supérieur à 90, coup critique (dmg*2)
        if (this.hit >= 90) {
            this.dmgDone = this.dmg * 2;
            console.warn("Coup critique !");
            // sinon dégâts normaux
        } else {
            this.dmgDone = this.dmg;
        }
        // on enlève les dégats aux PV de la cible
        this.target.hp -= this.dmgDone;
    }
    // sinon le coup rate
}

// // déterminer les dégâts infligés et les soustraire du pool d'hp de la cible
// NormalAttack.prototype.dmgDone = function() {
//     // on enlève les dégats aux PV de la cible
//     this.target.hp -= dmg;
// }