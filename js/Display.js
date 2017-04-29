function Display(player, monster) {
    this.player = player;
    this.monster = monster;
}

// affichage du début de combat
Display.prototype.startLog = function () {
    // affiche le niveau du monstre
    console.log(this.monster.name + ' est de niveau ' + this.monster.lvl);
    // affiche les PV du monstre
    console.log(this.monster.name + ' a ' + this.monster.hp + ' PV');
    // on encourage le joueur !
    console.log('Bonne chance !');
}

// affichage de l'initiative au début de chaque tour
Display.prototype.initLog = function (initPlayer, initMonster) {
    console.log(this.player.name + ' a une initiative de ' + initPlayer + ' et ' + this.monster.name + ' de ' + initMonster);
}

// affichage des résultats d'une attaque
Display.prototype.attackLog = function(char, target, attack) {
    // si l'attaque touche
    if (attack.hit > 0) {
        // affichage de la précision
        console.log(char.name + ' à touché ' + target.name + ' avec ' + attack.hit + ' de précision');
        // si le coup est critique
        if (attack.hit >= 90) {
        console.warn("Coup critique !");
        }
        // affichage des dégats infligés
        console.log(char.name + ' a infligé ' + attack.dmgDone + ' points de dégats à ' + target.name);
        // si la cible n'a plus de PV
        if (target.hp <= 0) {
            // vérification du sexe de la cible et affichage lié
            if (target.gender == 'F') {
                console.warn(target.name + " est morte, " + char.name + " a gagné !");
            } else {
                console.warn(target.name + " est mort, " + char.name + " a gagné !");
            }
        // sinon affichage de combien il reste de PV à la cible
        } else {
            console.log('Il reste ' + target.hp + ' PV à ' + target.name);
        }
    // si l'attaque ne touche pas
    } else {
        console.log(char.name + " a raté " + target.name + '(' + attack.hit + ')');
    }
}

// affichage de la montée en XP
Display.prototype.lvlLog = function () {
    // affichage de l'XP gagnée
    console.log(this.player.name + ' a gagné ' + this.monster.xpValue + ' XP');
    // appel de la méthode de montée de niveau
    this.player.lvlUp(this.monster.xpValue);
    // affichage du niveau du joueur
    console.log(this.player.name + ' est niveau ' + this.player.lvl);
    // affichage de l'XP actuelle du joueur
    console.log(this.player.name + ' a ' + this.player.xp + '/' + this.player.xpLvl + 'XP');
}
