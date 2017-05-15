function Display(player, monster, cell) {
    this.player = player;
    this.monster = monster;
    this.cell = cell;
    this.skelet();
}

// préparation des div HTML de l'affichage
Display.prototype.skelet = function() {
    var div = document.createElement("div");
    div.setAttribute("class", "flex-container")

    var divPlayer = document.createElement("div");
    divPlayer.setAttribute("id", "player");

    var divMonster = document.createElement("div");
    divMonster.setAttribute("id", "monster");

    var divFight = document.createElement("div");
    divFight.setAttribute("id", "fight");

    var divResults = document.createElement("div");
    divResults.setAttribute("id", "results");

    // insertion de la div juste avant la première balise script
    document.querySelector('body').insertBefore(div, document.querySelector('script'));
    div.appendChild(divPlayer);
    div.appendChild(divFight);
    div.appendChild(divResults);
    div.appendChild(divMonster);
}

// construction des boutons d'attaques (skills)
Display.prototype.inputAttack = function(cell) {
    var divPlayerSkills = document.createElement("div");
    divPlayerSkills.setAttribute("id", "skills");
    document.querySelector('#player').appendChild(divPlayerSkills);
    // pour chaque skill attribué à un personnage
    Object.values(this.player.skills).forEach(function(skill) {
        // on instancie le skill pour récupérer certaines de ses valeurs
        var skillInstance = new skill(this.player, this.monster);
        // création du bouton de déclenchement
        var input = document.createElement("input");
        input.setAttribute("type", "button");
        // attribution du nom de la CLASSE (et non pas du this.name présent dans le constructeur) à l'id du boutton
        input.setAttribute("id", skill.name);
        // attribution du nom de l'instance à la value du boutton
        input.value = skillInstance.name;
        // création d'un eventListener "onclick"
        input.addEventListener('click', function() {
            // on ré-instancie l'objet afin de redeterminer les valeurs à chaque attaque
            skillInstance = new skill(this.player, this.monster);
            // on envoie la nouvelle instance à la méthode de Cell
            cell.roundFight(this.player, this.monster, skillInstance);
        }.bind(this), false); // On bind l'eventListener sur l'objet Display
        divPlayerSkills.appendChild(input);
    }, this);
}

// désactivation des boutons liés aux compétences
Display.prototype.disableInputs = function(elemId, timer = 0) {
    el = document.querySelectorAll('#' + elemId + ' > input');
    el.forEach(function(input) {
        input.disabled = true;
        // input.style.display = "none";
        if (timer > 0) {
            disableTimer = setTimeout(function() {
                input.disabled = false;
                // input.style.display = "initial";
            }, timer)
        } else {
            console.log(disableTimer)
            window.clearTimeout(disableTimer);
            input.disabled = true;
            // input.style.display = "none";
        }
    })
}

// afficher une barre de progression
Display.prototype.loadBar = function(elemId, timer) {
    var elem = document.getElementById(elemId);
    var bar = document.createElement("div");
    bar.setAttribute("id", "bar");
    if (document.getElementById("bar")) {
        elem.replaceChild(bar, document.getElementById("bar"));
    } else {
        elem.appendChild(bar);
    }
    var width = 0;
    var inter = setInterval(frame, timer);

    function frame() {
        if (width >= 100) {
            clearInterval(inter);
            bar.style.display = "none";
        } else {
            width++;
            bar.style.width = width + '%';
        }
    }
}

// affichage de textes provenants d'un tableau
Display.prototype.normalText = function(targetId, array, newId) {
    var el = document.createElement("div");
    el.setAttribute("id", newId);
    array.forEach(function(text) {
        el.innerHTML += createTextVersion(text);
        el.innerHTML += "<br>";
    });
    if (document.querySelector('#' + targetId + "> div")) {
        document.querySelector('#' + targetId).replaceChild(el, document.querySelector('#' + targetId + "> div"));
    } else {
        document.querySelector('#' + targetId).appendChild(el);
    }
}

// affichage d'un texte avec un timer paramétrable
Display.prototype.timedOutText = function(id, text, timer = 500) {
    var el = document.querySelector("#" + id)
    var timer = setTimeout(function() {
        el.innerHTML += createTextVersion(text);
        el.innerHTML += "<br>";
    }, timer)
}

// affichage du début de combat
Display.prototype.startLog = function() {
    this.timedOutText("fight", "Vous arrivez dans " + this.cell.desc, 200);
}

// affichage des PV en cours
Display.prototype.HpLog = function(id, hp) {
    document.querySelector("#" + id).innerText = hp;
}

// affichage des statistiques des combattants
Display.prototype.statsLog = function() {
    this.normalText("player", [
        // affiche le niveau du joueur
        this.player.name + ' est de niveau ' + this.player.lvl,
        // affichage de l'XP actuelle du joueur
        this.player.name + ' a ' + this.player.xp + '/' + this.player.xpLvl + 'XP',
        // affiche les PV du joueur
        this.player.name + ' a ' + this.player.hp + '/' + this.player.hpFull + ' PV'
    ], "player_desc");
    this.normalText("monster", [
        // affiche le niveau du monstre
        this.monster.name + ' est de niveau ' + this.monster.lvl,
        // affiche les PV du monstre
        this.monster.name + ' a ' + this.monster.hp + '/' + this.monster.hpFull + ' PV'
    ], "monster_desc");
}

// affichage de l'initiative au début de chaque tour
Display.prototype.initLog = function(initPlayer) {
    this.timedOutText("fight", this.player.name + ' a une initiative de ' + initPlayer + ' et ' + this.monster.name + ' de ' + this.monster.init, 300);
}

// affichage des résultats des dégâts
Display.prototype.dmgLog = function(char, target, attack) {
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
Display.prototype.attackLog = function(char, target, attack) {
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
Display.prototype.lvlLog = function() {
    // lock des boutons d'attaque
    el = document.querySelectorAll('#player > input');
    el.forEach(function(element) {
        element.disabled = true;
    });
    // affichage de l'XP gagnée
    this.timedOutText("results", this.player.name + ' a gagné ' + this.monster.xpValue + ' XP', 1500);
    // appel de la méthode de montée de niveau
    this.player.lvlUp(this.monster.xpValue, this);
    // affichage du niveau du joueur
    this.timedOutText("results", this.player.name + ' est niveau ' + this.player.lvl, 1500);
    // affichage de l'XP actuelle du joueur
    this.timedOutText("results", this.player.name + ' a ' + this.player.xp + '/' + this.player.xpLvl + 'XP', 1500);
}