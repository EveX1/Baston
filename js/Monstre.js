function Monstre(name, str, end, agi, init, HP) {
    Perso.call(this, name);
    console.log(this.name);

    this.str = str;
    this.end = end;
    this.agi = agi;
    this.init = init;
    this.esq = this.agi * 5;
    this.HP = HP;

}

Monstre.prototype = Object.create(Perso.prototype);
Monstre.prototype.constructor = Monstre;