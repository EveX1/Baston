var player = new Player('Alice', 6, 6, 6);
var monster = new Monster('Bob', 3, 3, 3, 2, { esq: 5, hp: 50, xpValue: 32 });
var charac = new Charac('Char', 1, 1, 1, 1, { esq: 5 });

console.log(charac.esq);
console.log('Bob est de niveau ' + monster.lvl);
console.log('Bob a ' + monster.hp + ' PV');
console.log('Bonne chance !');
// tant que les persos ont des PV
console.log(monster.hp);
console.log(player.hp);
while (monster.hp > 0 && player.hp > 0) {
    console.log('Test');
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
        // player.victory(monster);

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
        // monster.victory(player);
    }

}

player.lvlUp(monster.xpValue)
console.log(player.name + ' a gagné ' + player.xp + ' XP');
console.log(player.name + ' est niveau ' + player.lvl);
console.log(player.name + ' a ' + player.xp + '/' + player.xpLvl + 'XP');