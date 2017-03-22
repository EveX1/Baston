function Perso() {
this.name = document.querySelector('#name').value;
this.str = document.querySelector('#str').value;
this.end = document.querySelector('#end').value;
this.agi = document.querySelector('#agi').value;
this.init = Math.floor((Math.random()*10)+1);
this.esq = this.agi*3
this.HP = 100+this.end*5;
this.pointsBase = 15;
}

function clamp(x, y, z) {
    return Math.max(Math.min(x, y), z);
}

Perso.prototype.setAttributes = function () {
    var points = document.querySelector('#pointsCara').innerText;
    var str = document.querySelector('#str');
    var end = document.querySelector('#end');
    var agi = document.querySelector('#agi');

    input = document.createElement('input');
    input.setAttribute("min", 1);
    input.setAttribute("type", "number");
    inputStr = input.setAttribute("onclick", "setAttributes(str.value)")
    inputEnd = input.setAttribute("onclick", "setAttributes(end.value)")
    inputAgi = input.setAttribute("onclick", "setAttributes(agi.value)")


    points = this.pointsBase+3-str.value-end.value-agi.value;

    if (points<=0)
    {
        str.setAttribute("max", str.value);
        end.setAttribute("max", end.value);
        agi.setAttribute("max", agi.value);
    } else {
        str.setAttribute("max",clamp(str.value+points, 10, 0));
        end.setAttribute("max", clamp(end.value+points, 10, 0));
        agi.setAttribute("max", clamp(agi.value+points, 10, 0));
    }
    document.querySelector('#pointsCara').innerText = points;

}
