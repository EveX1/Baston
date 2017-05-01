var form = new Form();


function launch() {
    var name = document.querySelector('#name').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var str = document.querySelector('#str').value;
    var end = document.querySelector('#end').value;
    var agi = document.querySelector('#agi').value;
    var player = new Player(name, gender, str, end, agi);
    var room = new Room(player, 1, "une salle obscure et dégoutante");
    var form = document.querySelector('form');
    document.querySelector('body').removeChild(form);
}