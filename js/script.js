var player = new Player('Alice', 6, 6, 6);
var monster = new Monster('Bob', 3, 3, 3, 5, 150, 4, 2);

console.log(monster.name + ' est de niveau ' + monster.lvl);
console.log(monster.name + ' a ' + monster.hp + ' PV');
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

        // vérifie si hit est un nombre car attack() renvoit une string en cas d'échec
        if (!isNaN(hit)) {
            player.log(monster);
        } else {
            console.log(hit);
        }

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
    }

}

console.log(player.name + ' a gagné ' + monster.xpValue + ' XP');
player.lvlUp(monster.xpValue);
console.log(player.name + ' est niveau ' + player.lvl);
console.log(player.name + ' a ' + player.xp + '/' + player.xpLvl + 'XP');