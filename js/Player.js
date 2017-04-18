function Player(name, str, end, agi) {
    Charac.call(this, name, str, end, agi);
    // this.points = document.querySelector('#attPoints').innerText;
    // this.name = document.querySelector('#name').value;
    // this.str = document.querySelector('#str').value;
    // this.end = document.querySelector('#end').value;
    // this.agi = document.querySelector('#agi').value;
    this.esq = this.agi * 5;
    this.xp = 0;
    this.lvl = 1;
    this.xplvl = this.lvl * 10;
    this.hp = 100 + this.end * (5 + (this.lvl - 1));
    this.pointsBase = 15;
}

Player.prototype = Object.create(Charac.prototype);
Player.prototype.conscructor = Player;

// encadrer une value entre un min et un max
function clamp(value, min, max) {
    return Math.max(Math.min(value, min), max);
}


Charac.prototype.lvlup = function(rewardxp) {
    this.xp += rewardxp;
    while (this.xp >= this.xplvl) {
        this.lvl++;
        this.xplvl = this.lvl * 10;
        this.hp = 100 + this.end * (5 + (this.lvl - 1));
        console.log('Vous avez gagné un niveau');
    }
}

Charac.prototype.createForm = function() {
    input = document.createElement('input');
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    inputStr = input.setAttribute("onclick", "setAttributes(str.value)");
    inputEnd = input.setAttribute("onclick", "setAttributes(end.value)");
    inputAgi = input.setAttribute("onclick", "setAttributes(agi.value)");
    console.log(inputStr);

    // document.querySelector('#str').appendChild(inputStr);
}

Charac.prototype.setAttributes = function() {

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