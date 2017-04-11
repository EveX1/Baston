var player = new Player('Alice', 6, 6, 6);
var monster = new Monster('Bob', 10, 10, 10, 8, 5, 50);

console.log('Bob a ' + monster.hp + ' PV');
console.log('Bonne chance !');
// tant que les persos ont des PV
while (monster.hp > 0 && player.hp > 0) {
    var initPlayer = player.init();
    var initMonster = monster.init;

    console.log(player.name + ' a une initiative de ' + initPlayer + ' et ' + monster.name + ' de ' + initMonster);
    // vérifie si l'initiative du perso est suffisante pour attaquer
    if (initPlayer > initMonster) {
        var result = player.attack(monster);
        var hit = result[0];
        var dmg = result[1];

        // vérifie si hit est un nombre
        if (!isNaN(hit)) {
            player.log(monster);
        } else {
            console.log(hit);
        }
        player.victory(monster);

        // sinon le monstre attaque
    } else {
        var result = monster.attack(player);
        var hit = result[0];
        var dmg = result[1];

        // vérifie si hit est un nombre
        if (!isNaN(hit)) {
            monster.log(player);
        } else {
            console.log(hit);
        }
        monster.victory(player);
    }

}