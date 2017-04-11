var alice = new Joueur('Alice', 6, 6, 6);
var bob = new Monstre('Bob', 3, 3, 3, 1, 5, 50);

console.log('Bob a ' + bob.hp + ' PV');
console.log('Bonne chance !');
// tant que la cible a des PV
while (bob.hp > 0) {
    var initAlice = alice.init();
    var initBob = bob.init;

    console.log(alice.name + ' a une initiative de ' + initAlice + ' et ' + bob.name + ' de '+ initBob );
    // vérifie si l'initiative du perso est suffisante pour attaquer
    if (initAlice > initBob) {
        var result = alice.attack(bob);
        var hit = result[0];
        var dmg = result[1];
        
        // vérifie si hit est un nombre
        if (!isNaN(hit)) {
            console.log('Alice à touché ' + bob.name + ' avec ' + hit + ' de précision');
            console.log('Alice a infligé ' + dmg +' points de dégats à ' + bob.name);
            console.log('Il reste '+ bob.hp + ' PV à Bob');
        } else {
            console.log(hit);
        }
        
    } else {
        console.log('Trop lent !');
    }

}
alice.victory(bob);