function NormalAttack(char, target) {
    this.name = "Attaque normale";
    this.char = char;
    this.target = target;
    this.hit = randomize(0, 100) - this.target.esq;
    this.dmg = randomize(this.char.str, this.char.str * 2);
}

// déterminer si l'attaquant touche et appliquer les dégâts
NormalAttack.prototype.attack = function () {
    // si l'attaquant touche
    if (this.hit > 0) {
        // si le hit est supérieur à 90, coup critique (dégâts augmentés)
        if (this.hit >= 90) {
            this.dmgDone = Math.round(this.dmg * 1.5);
            // sinon dégâts normaux
        } else {
            this.dmgDone = this.dmg;
        }
        // on enlève les dégats aux PV de la cible
        this.target.hp -= this.dmgDone;
    }
    // sinon le coup rate
};