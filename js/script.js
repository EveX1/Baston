var alice = new Perso('Alice');
var bob = new Perso('Bob');

// tant que la cible a des PV
while (bob.HP > 0) {
    var initAlice = alice.init();
    var initBob = bob.init();
    console.log('Alice a une initiative de ' + initAlice + ' et Bob de '+ initBob );
    // vérifie si l'initiative du perso est suffisante pour attaquer
    if (initAlice > initBob) {
        console.log('Il reste '+ bob.HP + ' PV à Bob');
        var result = alice.attack(bob);
        var hit = result[0];
        var dmg = result[1];
        
        // vérifie si hit est un nombre
        if (!isNaN(hit)) {
            console.log('Alice à touché ' + bob.name + ' avec ' + hit + ' de précision');
            console.log('Alice a infligé ' + dmg +' points de dégats à ' + bob.name);
            console.log('Il reste '+ bob.HP + ' PV à Bob');
        } else {
            console.log(hit);
        }
        
    } else {
        console.log('Trop lent !');
    }

}
alice.victory(bob);