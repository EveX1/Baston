function Display(player, monster, room) {
    this.player = player;
    this.monster = monster;
    this.room = room;
    console.log(this.room)
    this.skelet();
}

Display.prototype.skelet = function () {
    var div = document.createElement("div");
    var divPlayer = document.createElement("div");
    divPlayer.setAttribute("id", "player");
    var divMonster = document.createElement("div");
    divMonster.setAttribute("id", "monster");
    var divFight = document.createElement("div");
    divFight.setAttribute("id", "fight");
    var divResults = document.createElement("div");
    divResults.setAttribute("id", "results");

    document.querySelector('body').insertBefore(div, document.querySelector('script'));
    div.appendChild(divPlayer);
    div.appendChild(divMonster);
    div.appendChild(divFight);
    div.appendChild(divResults);
}

Display.prototype.inputAttack = function (room) {
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", "attack");
    input.value = "Attaquer";
    input.onclick = function () {
        room.roundFight(this.player, this.monster);
    }
    document.querySelector('#player').appendChild(input);
}

Display.prototype.normalText = function (id, text) {
    var p = document.createElement("p");
    p.innerText = text;
    document.querySelector('#' + id).appendChild(p);
}

Display.prototype.timedOutText = function (id, text) {
    var el = document.querySelector("#" + id)
    var timer = setTimeout(function () {
        el.innerText += " " + text;
        el.innerHTML += "<br>";
    }, 500)
}

// affichage du début de combat
Display.prototype.startLog = function () {
    // affiche le niveau du joueur
    this.normalText("player", this.player.name + ' est de niveau ' + this.player.lvl);
    // affichage de l'XP actuelle du joueur
    this.normalText("player", this.player.name + ' a ' + this.player.xp + '/' + this.player.xpLvl + 'XP');
    // affiche les PV du joueur
    this.normalText("player", this.player.name + ' a ' + this.player.hp + '/' + this.player.hpFull + ' PV');
    // affiche le niveau du monstre
    this.normalText("monster", this.monster.name + ' est de niveau ' + this.monster.lvl);
    // affiche les PV du monstre
    this.normalText("monster", this.monster.name + ' a ' + this.monster.hp + ' PV');
    // on encourage le joueur !
    this.timedOutText("fight", 'Bonne chance !');
}

// affichage de l'initiative au début de chaque tour
Display.prototype.initLog = function (initPlayer, initMonster) {
    this.timedOutText("fight", this.player.name + ' a une initiative de ' + initPlayer + ' et ' + this.monster.name + ' de ' + initMonster);
    // console.log(this.player.name + ' a une initiative de ' + initPlayer + ' et ' + this.monster.name + ' de ' + initMonster);
}

// affichage des résultats des dégâts
Display.prototype.dmgLog = function (char, target, attack) {
    // affichage des dégats infligés
    this.timedOutText("fight", char.name + ' a infligé ' + attack.dmgDone + ' points de dégats à ' + target.name);
    // si la cible n'a plus de PV
    if (target.hp <= 0) {
        // vérification du sexe de la cible et affichage lié
        if (target.gender == 'F') {
            this.timedOutText("results", target.name + " est morte, " + char.name + " a gagné !");
        } else {
            this.timedOutText("results", target.name + " est mort, " + char.name + " a gagné !");
        }
        // sinon affichage de combien il reste de PV à la cible
    } else {
        this.timedOutText("fight", 'Il reste ' + target.hp + '/' + target.hpFull + ' PV à ' + target.name);
    }
}

// affichage des résultats d'une attaque
Display.prototype.attackLog = function (char, target, attack) {
    // si l'attaque touche
    if (attack.hit > 0) {
        // affichage de la précision
        this.timedOutText("fight", char.name + ' à touché ' + target.name + ' avec ' + attack.hit + ' de précision');
        // si le coup est critique
        if (attack.hit >= 90) {
            this.timedOutText("fight", "Coup critique !");
        }
        this.dmgLog(char, target, attack)
        // si l'attaque ne touche pas
    } else {
        this.timedOutText("fight", char.name + " a raté " + target.name + ' (' + attack.hit + ')');
    }
}

// affichage de la montée en XP
Display.prototype.lvlLog = function () {
    // affichage de l'XP gagnée
    this.timedOutText("results", this.player.name + ' a gagné ' + this.monster.xpValue + ' XP');
    // appel de la méthode de montée de niveau
    this.player.lvlUp(this.monster.xpValue);
    // affichage du niveau du joueur
    this.timedOutText("results", this.player.name + ' est niveau ' + this.player.lvl);
    // affichage de l'XP actuelle du joueur
    this.timedOutText("results", this.player.name + ' a ' + this.player.xp + '/' + this.player.xpLvl + 'XP');
}