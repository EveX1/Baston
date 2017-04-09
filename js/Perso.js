function Perso(name) {
    this.name = name;
    console.log(this.name);
    this.createForm();
    this.str = 6;
    this.end = 6;
    this.agi = 6;
    // this.points = document.querySelector('#attPoints').innerText;
    // this.name = document.querySelector('#name').value;
    // this.str = document.querySelector('#str').value;
    // this.end = document.querySelector('#end').value;
    // this.agi = document.querySelector('#agi').value;
    this.esq = this.agi * 5;
    this.HP = 100 + this.end * 5;
    this.pointsBase = 15;

}
// encadrer une value entre un min et un max
function clamp(value, min, max) {
    return Math.max(Math.min(value, min), max);
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
    target.HP -= dmg
    return dmg;
}

// fonction de condition de victoire intégrée à l'attaque (provisoire)
Perso.prototype.victory = function (target) {
    if (target.HP <= 0) {
        console.log(target.name + " est mort(e), " + this.name + " a gagné !")
    }
}


Perso.prototype.createForm = function () {
    input = document.createElement('input');
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    inputStr = input.setAttribute("onclick", "setAttributes(str.value)")
    inputEnd = input.setAttribute("onclick", "setAttributes(end.value)")
    inputAgi = input.setAttribute("onclick", "setAttributes(agi.value)")
    console.log(inputStr);

    // document.querySelector('#str').appendChild(inputStr);
}

Perso.prototype.setAttributes = function () {
    
    var points = this.pointsBase + 3 - str.value - end.value - agi.value;
    var str = document.querySelector('#str');
    var end = document.querySelector('#end');
    var agi = document.querySelector('#agi');
    console.log(this.strF);

    if (points <= 0) {
        str.setAttribute("max", str.value);
        end.setAttribute("max", end.value);
        agi.setAttribute("max", agi.value);
    } else {
        str.setAttribute("max", clamp(str.value + points, 10, 0));
        end.setAttribute("max", clamp(end.value + points, 10, 0));
        agi.setAttribute("max", clamp(agi.value + points, 10, 0));
    }
    document.querySelector('#pointsCara').innerText = points;
}