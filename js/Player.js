function Player(name, gender, str, end, agi) {
    Charac.call(this, name, gender, str, end, agi);
    this.esq = this.agi * 5;
    this.xp = 0;
    this.lvl = 1;
    this.xpLvl = 10;
    this.hp = 100 + this.end * (5 + (this.lvl - 1));
    this.hpFull = 100 + this.end * (5 + (this.lvl - 1));
}

Player.prototype = Object.create(Charac.prototype);
Player.prototype.conscructor = Player;

Player.prototype.lvlUp = function (rewardXp, display) {
    // rajoute l'XP obtenue à l'XP du perso
    this.xp += rewardXp;
    // Tant que l'XP gagnée fait monter d'un niveau
    while (this.xp >= this.xpLvl) {
        // on monte d'un niveau
        this.lvl++;
        // on augmente le maximum d'XP nécessaire au passage du niveau suivant
        this.xpLvl = Math.round(Math.pow(this.lvl * 8, 1.2));
        // on recalcule les PV max (basés sur le niveau)
        this.hpFull = 100 + this.end * (5 + (this.lvl - 1));
        this.hp = this.hpFull;
        display.timedOutText("results", this.name + ' a gagné un niveau', 1000);
        display.timedOutText("results", this.name + ' est de niveau ' + this.lvl, 1000);
    }
}