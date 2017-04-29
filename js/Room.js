function Room(player, roomLvl, desc) {
    this.player = player;
    this.roomLvl = roomLvl;
    this.desc = desc;
    this.randomMonsterLvl = monsters.ilvl[this.roomLvl];
    console.log(Object.keys(this.randomMonsterLvl))
    this.randomMonster = (Object.keys(this.randomMonsterLvl))[Math.floor(Math.random() * (Object.keys(this.randomMonsterLvl)).length)];
    console.log(this.randomMonster);
    this.monster = new Monster(monsters.ilvl[1].pillard2.name, monsters.ilvl[1].pillard2.gender, monsters.ilvl[1].pillard2.str, monsters.ilvl[1].pillard2.end, monsters.ilvl[1].pillard2.agi, monsters.ilvl[1].pillard2.esq, monsters.ilvl[1].pillard2.hp, monsters.ilvl[1].pillard2.lvl, monsters.ilvl[1].pillard2.initM);
    // this.monster = new Monster('Bob', 'M', 3, 3, 3, 0, 70, 6, 2);
    this.display = new Display(this.player, this.monster);
    // this.loot = new Loot();
    this.display.startLog();
    this.start(this.player, this.monster);
}

Room.prototype.start = function(player, monster) {
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