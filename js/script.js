var player = new Player('Alice', 'F', 6, 6, 6);
var monster = new Monster('Bob', 'M', 3, 3, 3, 0, 70, 6, 2);
var display = new Display(player, monster);

display.startLog()

// tant que les persos ont des PV
while (monster.hp > 0 && player.hp > 0) {
    var initPlayer = player.init();
    var initMonster = monster.init;
    display.initLog(initPlayer, initMonster)
    // vérifie si l'initiative du perso est suffisante pour attaquer
    if (initPlayer > initMonster) {
        // instancie l'attaque
        var result = new NormalAttack(player, monster);
        // applique l'attaque
        result.attack();
        // affiche les résultats de l'attaque
        display.attackLog(player, monster, result);

        // sinon le monstre attaque
    } else {
        // instancie l'attaque
        var result = new NormalAttack(monster, player);
        // applique l'attaque
        result.attack();
        // affiche les résultats de l'attaque
        display.attackLog(monster, player, result);

    }

}
// affiche le résultat final du combat
if (player.pv > 0) {
    display.lvlLog()
}
