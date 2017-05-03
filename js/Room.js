function Room(player, roomLvl, desc) {
    this.player = player;
    this.roomLvl = roomLvl;
    this.desc = desc;
    // va chercher un monstre dans la table des monstres qui correspond au niveau de la salle
    this.randomMonster = monsters.ilvl[this.roomLvl][(Object.keys(monsters.ilvl[this.roomLvl]))[Math.floor(Math.random() * (Object.keys(monsters.ilvl[this.roomLvl])).length)]];
    // création du monstre
    this.monster = new Monster(this.randomMonster.name, this.randomMonster.gender, this.randomMonster.str, this.randomMonster.end, this.randomMonster.agi, this.randomMonster.esq, this.randomMonster.hp, this.randomMonster.lvl, this.randomMonster.initM);
    this.display = new Display(this.player, this.monster, this);
    // this.loot = new Loot();
    this.startRoom();

}
// lancement 
Room.prototype.startRoom = function () {
    this.display.startLog();
    this.display.statsLog();
    this.display.inputAttack(this);

    // this.player.skills.forEach(function (skill) {
    //     this.display.inputAttack(this, skill)
    // }, this);
}

// fonction de déclenchement des actions et attaques pour chaque round
Room.prototype.roundFight = function (player, monster, skill) {
    // tant que les persos ont des PV
    if (this.monster.hp > 0 && this.player.hp > 0) {
        // désactivation des boutons de compétences le temps d'afficher les résultats
        this.display.disableInputsTimer();
        // initialisation des valeurs d'initiative
        var initPlayer = this.player.init();
        var initMonster = this.monster.init;
        // appel de la fonction d'affichage des initiatives
        this.display.initLog(initPlayer);
        // vérifie si l'initiative du perso est suffisante pour attaquer
        if (initPlayer > initMonster) {
            // applique l'attaque
            skill.attack();
            // affiche les résultats de l'attaque
            this.display.attackLog(this.player, this.monster, skill);

            // sinon le monstre attaque
        } else {
            // instancie l'attaque
            var skill = new NormalAttack(this.monster, this.player);
            // applique l'attaque
            skill.attack();
            // affiche les résultats de l'attaque
            this.display.attackLog(this.monster, this.player, skill);
        }
        this.display.statsLog();

    }
    // affiche le résultat final du combat
    if (this.monster.hp <= 0) {
        this.display.lvlLog()
    }
}