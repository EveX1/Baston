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
    var points = document.querySelector('#pointsCara').innerHTML;
    var str = document.querySelector('#str').value;
    var end = document.querySelector('#end').value;
    var agi = document.querySelector('#agi').value;

    points = pointsBase+3-str-end-agi;

    if (points<=0)
    {
        document.querySelector('#str').setAttribute("max", str);
        document.querySelector('#end').setAttribute("max", end);
        document.querySelector('#agi').setAttribute("max", agi);
    } else {
        document.querySelector('#str').setAttribute("max",clamp(str+points, 10, 0));
        document.querySelector('#end').setAttribute("max", clamp(end+points, 10, 0));
        document.querySelector('#agi').setAttribute("max", clamp(agi+points, 10, 0));
    }
    document.querySelector('#pointsCara').innerHTML = points;

}
