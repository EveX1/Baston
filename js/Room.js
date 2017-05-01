function Room(player, roomLvl, desc) {
    this.player = player;
    this.roomLvl = roomLvl;
    this.desc = desc;
    this.randomMonster = monsters.ilvl[this.roomLvl][(Object.keys(monsters.ilvl[this.roomLvl]))[Math.floor(Math.random() * (Object.keys(monsters.ilvl[this.roomLvl])).length)]];
    this.monster = new Monster(this.randomMonster.name, this.randomMonster.gender, this.randomMonster.str, this.randomMonster.end, this.randomMonster.agi, this.randomMonster.esq, this.randomMonster.hp, this.randomMonster.lvl, this.randomMonster.initM);
    this.display = new Display(this.player, this.monster, this);
    // this.loot = new Loot();
    this.startRoom();

}
Room.prototype.startRoom = function () {
    this.display.startLog();
    Object.values(this.player.skills).forEach(function (skill) {
        this.display.inputAttack(this, skill)
    }, this);
}

Room.prototype.roundFight = function (player, monster, skill) {
    // tant que les persos ont des PV
    if (this.monster.hp > 0 && this.player.hp > 0) {
        var initPlayer = this.player.init();
        var initMonster = this.monster.init;
        this.display.initLog();
        // vérifie si l'initiative du perso est suffisante pour attaquer
        if (initPlayer > initMonster) {
            // instancie l'attaque
            var result = new skill(this.player, this.monster);
            console.warn(result)
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
    if (this.monster.hp <= 0) {
        document.querySelector('#attack').disabled = true;
        this.display.lvlLog()
    }
}