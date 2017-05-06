function Form() {
    this.pointsBase = 15;
    this.createForm();
    this.points = document.querySelector('#attPoints').innerText;
}

// méthode de création du formulaire de personnage
Form.prototype.createForm = function() {
    var br = document.createElement("br");
    var div = document.createElement("div");

    // création du cadre du formulaire
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    var fieldset1 = document.createElement("fieldset");
    fieldset1.setAttribute("id", "fieldset1")
    var legend1 = document.createElement("legend");
    legend1.innerText = "Création de personnage";

    // nom du personnage
    var labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.innerText = "Nom du personnage: ";
    var inputName = document.createElement("input");
    inputName.setAttribute("id", "name");
    inputName.value = "Alice";

    // sexe du personnage
    var labelGender = document.createElement("label");
    labelGender.innerText = "Sexe: ";
    var radioGenderM = document.createElement("input");
    radioGenderM.setAttribute("type", "radio");
    radioGenderM.setAttribute("name", "gender");
    radioGenderM.setAttribute("value", "M");
    radioGenderM.checked = true;
    radioGenderM.innerHTML = "&nbsp;Homme";
    var radioGenderF = document.createElement("input");
    radioGenderF.setAttribute("type", "radio");
    radioGenderF.setAttribute("name", "gender");
    radioGenderF.setAttribute("value", "F");
    radioGenderF.innerHTML = "&nbsp;Femme";

    // partie attributs du personnage
    var fieldset2 = document.createElement("fieldset");
    fieldset2.setAttribute("id", "attributes")
    var legend2 = document.createElement("legend");
    legend2.innerText = "Attributs";

    var pAtt = document.createElement("p");
    pAtt.innerHTML = "Il vous reste <span id=\"attPoints\"></span> points à répartir entre les 3 caractéristiques suivantes: ";

    // bouton de validation
    var submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("name", "start");
    submit.onclick = launch;
    submit.value = "Start";

    // insertion des éléments créés dans la page
    document.querySelector('body').insertBefore(form, document.querySelector('script'));
    document.querySelector('form').appendChild(fieldset1);

    this.multiAppend("#fieldset1", [legend1, labelName, inputName, br, labelGender, radioGenderM, radioGenderF, fieldset2])

    document.querySelector('#attributes').appendChild(legend2);
    document.querySelector('#attributes').appendChild(div);
    document.querySelectorAll('div')[0].appendChild(pAtt);

    //création et insertion des champs d'attributs
    this.createInput("str", "Force: ");
    this.createInput("end", "Endurance: ");
    this.createInput("agi", "Agilité: ");
    document.querySelector('form').appendChild(submit);
    this.setAttributes();
}

// function permettant des multiple appendChild avec un tableau d'éléments
Form.prototype.multiAppend = function(element, childs) {
    childs.forEach(function(child) {
        document.querySelector(element).appendChild(child);
    }, this);
}

//création et insertion des champs d'attributs
Form.prototype.createInput = function(att, labelText) {
    var div = document.createElement("div");
    div.setAttribute("id", "div" + att)
    var input = document.createElement('input');
    var label = document.createElement("label");
    label.setAttribute("for", att)
    label.innerText = labelText;
    input.setAttribute("id", att);
    input.setAttribute("type", "number");
    input.setAttribute("min", 1);
    input.setAttribute("value", 5);
    document.querySelector("#attributes").appendChild(div);
    document.querySelector("#div" + att).appendChild(label);
    document.querySelector("#div" + att).appendChild(input);
    input.oninput = this.setAttributes.bind(this);
}

// fonction de calcul et de limite des attributs
Form.prototype.setAttributes = function() {

    var str = document.querySelector('#str');
    var end = document.querySelector('#end');
    var agi = document.querySelector('#agi');
    //calcul des points restants à distribuer
    this.points = this.pointsBase + 3 - str.value - end.value - agi.value;

    // si les points sont inférieurs ou égaux à 0
    if (this.points <= 0) {
        // chaque valeur de champ est limité au maximum à elle même
        str.setAttribute("max", str.value);
        end.setAttribute("max", end.value);
        agi.setAttribute("max", agi.value);
    } else {
        // sinon elle est limitée à une valeur comprise entre 1 et 10 OU sa valeur actuelle + les points restants à distribuer si inférieure à 10
        str.setAttribute("max", clamp(str.value + this.points, 10, 1));
        end.setAttribute("max", clamp(end.value + this.points, 10, 1));
        agi.setAttribute("max", clamp(agi.value + this.points, 10, 1));
    }
    document.querySelector('#attPoints').innerText = this.points;
}