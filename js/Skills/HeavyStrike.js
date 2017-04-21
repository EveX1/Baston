function HeavyStrike(char, target) {
    NormalAttack.call(this, char, target)
    this.hit = randomize(0, 50) - this.target.esq;
    this.dmg = randomize(this.char.str * 3, this.char.str * 5);
    this.attack();
    this.dmgDone = 0;
}

HeavyStrike.prototype = Object.create(NormalAttack.prototype);
HeavyStrike.prototype.constructor = HeavyStrike;