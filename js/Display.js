function Display(player, monster, room) {
    this.player = player;
    this.monster = monster;
    this.room = room;
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

Display.prototype.inputAttack = function (room, skill) {
    var input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", skill);
    console.log(skill)
    console.log(skill.name)
    input.value = skill.name;
    input.onclick = function () {
        room.roundFight(this.player, this.monster, skill);
    }
    document.querySelector('#player').appendChild(input);
}

// Display.prototype.normalText = function (id, text) {
//     var div = document.createElement("div");
//     div.innerText = text;
//     document.querySelector('#' + id).appendChild(div);
// }

// affichage d'un tableau de textes
Display.prototype.normalText = function (id, array) {
    var el = document.createElement("div");
    array.forEach(function (text) {
        el.innerHTML += createTextVersion(text);
        el.innerHTML += "<br>";
    });
    var display = el;
    document.querySelector('#' + id).appendChild(display);
}

// affichage d'un texte avec un timer paramétrable
Display.prototype.timedOutText = function (id, text, timer = 500) {
    var el = document.querySelector("#" + id)
    var timer = setTimeout(function () {
        el.innerHTML += createTextVersion(text);
        el.innerHTML += "<br>";
    }, timer)
}

// affichage du début de combat
Display.prototype.startLog = function () {
    this.normalText("player", [
        // affiche le niveau du joueur
        this.player.name + ' est de niveau ' + this.player.lvl,
        // affichage de l'XP actuelle du joueur
        this.player.name + ' a ' + this.player.xp + '/' + this.player.xpLvl + 'XP',
        // affiche les PV du joueur
        this.player.name + ' a ' + this.player.hp + '/' + this.player.hpFull + ' PV'
    ]);
    this.normalText("monster", [
        // affiche le niveau du monstre
        this.monster.name + ' est de niveau ' + this.monster.lvl,
        // affiche les PV du monstre
        this.monster.name + ' a ' + this.monster.hp + ' PV'
    ]);
    this.timedOutText("fight", "Vous arrivez dans " + this.room.desc, 200);
}

// // affichage de l'initiative au début de chaque tour
// Display.prototype.initLog = function (initPlayer, initMonster) {
//     this.timedOutText("fight", this.player.name + ' a une initiative de ' + initPlayer + ' et ' + this.monster.name + ' de ' + initMonster);
// }
// affichage de l'initiative au début de chaque tour
Display.prototype.initLog = function () {
    this.timedOutText("fight", this.player.name + ' a une initiative de ' + this.player.init() + ' et ' + this.monster.name + ' de ' + this.monster.init, 300);
}

// affichage des résultats des dégâts
Display.prototype.dmgLog = function (char, target, attack) {
    // affichage des dégats infligés
    this.timedOutText("fight", char.name + ' a infligé ' + attack.dmgDone + ' points de dégats à ' + target.name, 900);
    // si la cible n'a plus de PV
    if (target.hp <= 0) {
        // vérification du sexe de la cible et affichage lié
        if (target.gender == 'F') {
            this.timedOutText("results", target.name + " est morte, " + char.name + " a gagné !", 1200);
        } else {
            this.timedOutText("results", target.name + " est mort, " + char.name + " a gagné !", 1200);
        }
        // sinon affichage de combien il reste de PV à la cible
    } else {
        this.timedOutText("fight", 'Il reste ' + target.hp + '/' + target.hpFull + ' PV à ' + target.name, 1200);
    }
}

// affichage des résultats d'une attaque
Display.prototype.attackLog = function (char, target, attack) {
    // si l'attaque touche
    if (attack.hit > 0) {
        // affichage de la précision
        this.timedOutText("fight", char.name + ' à touché ' + target.name + ' avec ' + attack.hit + ' de précision', 700);
        // si le coup est critique
        if (attack.hit >= 90) {
            this.timedOutText("fight", "Coup critique !", 600);
        }
        // appel de la function d'affichage des dégâts
        this.dmgLog(char, target, attack)
        // si l'attaque ne touche pas
    } else {
        this.timedOutText("fight", char.name + " a raté " + target.name + ' (' + attack.hit + ')', 700);
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