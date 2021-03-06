function HeavyStrike(char, target) {
    NormalAttack.call(this, char, target);
    this.name = "Attaque Lourde";
    this.hit = randomize(0, 100) - this.target.esq * 2;
    this.dmg = randomize(this.char.str * 3, this.char.str * 5);
}

HeavyStrike.prototype = Object.create(NormalAttack.prototype);
HeavyStrike.prototype.constructor = HeavyStrike;