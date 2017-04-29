function Player(name, gender, str, end, agi) {
    Charac.call(this, name, gender, str, end, agi);
    this.pointsBase = 15;
    // this.createForm();
    // this.setAttributes();
    // this.points = document.querySelector('#attPoints').innerText;
    // this.name = document.querySelector('#name').value;
    // this.str = document.querySelector('#str').value;
    // this.end = document.querySelector('#end').value;
    // this.agi = document.querySelector('#agi').value;
    this.esq = this.agi * 5;
    this.xp = 0;
    this.lvl = 1;
    this.xpLvl = 10;
    this.hp = 100 + this.end * (5 + (this.lvl - 1));
}

Player.prototype = Object.create(Charac.prototype);
Player.prototype.conscructor = Player;

Player.prototype.lvlUp = function(rewardXp) {
    // rajoute l'XP obtenue à l'XP du perso
    this.xp += rewardXp;
    // Tant que l'XP gagnée fait monter d'un niveau
    while (this.xp >= this.xpLvl) {
        // on monte d'un niveau
        this.lvl++;
        // on augmente le maximum d'XP nécessaire au passage du niveau suivant
        this.xpLvl = Math.round(Math.pow(this.lvl * 8, 1.2));
        // on recalcule les PV max (basés sur le niveau)
        this.hp = 100 + this.end * (5 + (this.lvl - 1));
        console.log(this.name + ' a gagné un niveau');
        console.log(this.name + ' est de niveau ' + this.lvl);
    }
}

Charac.prototype.createForm = function() {
    // input = document.createElement('input');
    // input.setAttribute("onclick", "setAttributes(x.value)")
    // input.setAttribute("type", "number");
    // input.setAttribute("min", 1);

    inputStr = document.createElement('input');
    inputStr.setAttribute("onclick", "player.setAttributes()");
    inputStr.setAttribute("type", "number");
    inputStr.setAttribute("min", 1);
    inputStr.setAttribute("value", this.str);
    inputEnd = document.createElement('input');
    inputEnd.setAttribute("onclick", "player.setAttributes()");
    inputEnd.setAttribute("type", "number");
    inputEnd.setAttribute("min", 1);
    inputEnd.setAttribute("value", this.end);
    inputAgi = document.createElement('input');
    inputAgi.setAttribute("onclick", "player.setAttributes()");
    inputAgi.setAttribute("type", "number");
    inputAgi.setAttribute("min", 1);
    inputAgi.setAttribute("value", this.agi);


    document.querySelector('#str').appendChild(inputStr);
    document.querySelector('#end').appendChild(inputEnd);
    document.querySelector('#agi').appendChild(inputAgi);
}

Charac.prototype.setAttributes = function() {

    var str = document.querySelector('#str > input');
    var end = document.querySelector('#end > input');
    var agi = document.querySelector('#agi > input');
    this.points = this.pointsBase + 3 - str.value - end.value - agi.value;

    if (this.points <= 0) {
        str.setAttribute("max", str.value);
        end.setAttribute("max", end.value);
        agi.setAttribute("max", agi.value);
    } else {
        str.setAttribute("max", clamp(str.value + this.points, 10, 0));
        end.setAttribute("max", clamp(end.value + this.points, 10, 0));
        agi.setAttribute("max", clamp(agi.value + this.points, 10, 0));
    }
    document.querySelector('#attPoints').innerText = this.points;
    document.querySelector('#name').value = this.name;
}