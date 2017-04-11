function Monstre(name, str, end, agi, initM, esq, hp) {
    Perso.call(this, name, str, end, agi, esq, hp);
    this.init = initM;
    console.log(this.name);
}

Monstre.prototype = Object.create(Perso.prototype);
Monstre.prototype.constructor = Monstre;