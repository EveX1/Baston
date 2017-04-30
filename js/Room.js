function Room(player, roomLvl, desc) {
    this.player = player;
    this.roomLvl = roomLvl;
    this.desc = desc;
    this.randomMonster = monsters.ilvl[this.roomLvl][(Object.keys(monsters.ilvl[this.roomLvl]))[Math.floor(Math.random() * (Object.keys(monsters.ilvl[this.roomLvl])).length)]];
    this.monster = new Monster(this.randomMonster.name, this.randomMonster.gender, this.randomMonster.str, this.randomMonster.end, this.randomMonster.agi, this.randomMonster.esq, this.randomMonster.hp, this.randomMonster.lvl, this.randomMonster.initM);
    // this.monster = new Monster('Bob', 'M', 3, 3, 3, 0, 70, 6, 2);
    this.display = new Display(this.player, this.monster);
    // this.loot = new Loot();
    console.log("Vous arrivez dans " + this.desc)
    this.display.startLog();
    this.startFight(this.player, this.monster);
}

Room.prototype.startFight = function (player, monster) {
    // tant que les persos ont des PV
    while (this.monster.hp > 0 && this.player.hp > 0) {
        var initPlayer = this.player.init();
        var initMonster = this.monster.init;
        this.display.initLog(initPlayer, initMonster);
        // vérifie si l'initiative du perso est suffisante pour attaquer
        if (initPlayer > initMonster) {
            // instancie l'attaque
            var result = new NormalAttack(this.player, this.monster);
            // applique l'attaque
            result.attack();
            // affiche les résultats de l'attaque
            this.display.attackLog(this.player, this.monster, result);

            // sinon le monstre attaque
        } else {
            // instancie l'attaque
            var result = new NormalAttack(this.monster, this.player);
            // applique l'attaque
            result.attack();
            // affiche les résultats de l'attaque
            this.display.attackLog(this.monster, this.player, result);
        }

    }
    // affiche le résultat final du combat
    if (this.player.hp > 0) {
        this.display.lvlLog();
    }
}