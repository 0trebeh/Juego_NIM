var board = new Array(5);

var px = -1;
var py = -1;

var currentPlayer = 0;

function initial(){
  board[0] = 1;
  board[1] = 2;
  board[2] = 3;
  board[3] = 4;
  board[4] = 5;
}

function testGameOver() {
  var over = 1;
  for (var x = 0; x < 5; x++) {
    if (board[x] > 0) {
      over = 0;
    }
  }

  if (over) {
    var winner = "";
    if (currentPlayer == 2) {
      winner = "Fin del partido. El ordenador ganó.";
    } else if (currentPlayer == 1) {
      winner = "Fin del partido. ¡Ganaste!";
    }else if (currentPlayer == 3) {
      winner = "Fin del partido. Jugador 1 Gano";
    }else if (currentPlayer == 4) {
      winner = "Fin del partido. Jugador 2 Gano";
    }
    startup();
    back();
    initial();
    alert(winner);

    currentPlayer = 0;
  }
}


function startup() {
  initial();
  hide('block');
  var html = "<div class='col-md-8 mx-auto'>"
  html += "<div class='card card-body mt-5 dark'>"
  html += "<p><span onclick='startComputer()' class='style'><button type='submit' class='btn nbtn mx-auto p-2'> El ordenador hace la primera jugada </button><\/span><\/p>";
  html += "<p><span onclick='startHuman()' class='style'><button type='submit' class='btn nbtn mx-auto p-2'> Tu haces la primera jugada </button><\/span><\/p>";
  html +="</div></div>"

  el('game').innerHTML = html;
}
startup();


function el(id){if (document.getElementById){return document.getElementById(id)}else if (window[id]){return window[id]}return null}


function pieceIn(x, y) {
  if (currentPlayer == 1 | currentPlayer == 3 | currentPlayer == 4) {
    if ((px != x) || (py != y)) {
      px = x;
      py = y;

      for (var iy = 0; iy < board[x]; iy++)
        if (iy <= y)
          el('img' + x + iy).src = "./public/img/ficha0.png";
    }
  }

  return true;
}


function pieceOut(x, y)
{
  if (currentPlayer == 1 | currentPlayer == 3 | currentPlayer == 4) {
    px = -1;
    py = -1;

    for (var iy = 0; iy < board[x]; iy++)
      if (iy <= y)
        el('img' + x + iy).src = "./public/img/ficha1.png";
  }

  return true;
}


function pieceClick(x, y) {
  pieceOut(x, y);
  if (currentPlayer == 1) {
    board[x] -= y + 1;

    updateBoard();
    testGameOver();
    if (currentPlayer != 0) {
      computer();
    }
  }

  if (currentPlayer == 3 | currentPlayer == 4) {
    board[x] -= y + 1;

    updateBoard();
    testGameOver();
    if (currentPlayer == 3) {
      human2();
    }else{
      human1();
    }
  }

  return true;
}


function updateBoard()
{
  var html = "<table class='mt-5' height='150' onmouseout='pieceOut(0, 0)' style='margin-left: auto; margin-right: auto;'><tr>";
  for (var x = 0; x < 5; x++) {
    html += "<td valign='bottom' width='20'>";
    for (var y = 0; y < board[x]; y++) {
      var name = "./public/img/ficha1.png";
      if ((x == px) && (y <= py)) {
        name = "./public/img/ficha0.png";
      }

      html += "<img id='img" + x + y + "' style='margin-bottom: 5px; width: 100px; height: 100px;' src='" + name + "' onMouseDown=\"pieceClick(" + x + ", " + y + ")\" onMouseOver='pieceIn(" + x + ", " + y + ")' onMouseOut='pieceOut(" + x + ", " + y + ")'><br>";
    }
    html += "<\/td>";
  }
  html += "<\/tr><\/table>";

  el('game').innerHTML = html;
}

function computerPerform() {
  board[px] -= py + 1;
  px = -1;
  py = -1;
  updateBoard();
  testGameOver();

  if (currentPlayer != 0) {
    human();
  }
}


function zeroSum() {
  var bit1 = 0;
  var bit2 = 0;
  var bit3 = 0;
  for (var x = 0; x < 5; x++) {
    if (board[x] % 2 == 1) {
      bit1++;
      bit1 = bit1 % 2;
    }
    if (board[x] % 4 >= 2) {
      bit2++;
      bit2 = bit2 % 2;
    }
    if (board[x] >= 4) {
      bit3++;
      bit3 = bit3 % 2;
    }
  }

  var value = bit1 + bit2 * 2 + bit3 * 4;

  return (value == 0);
}


function computerSelect() {
  py = 0;
  px = -1;

  for (var x = 0; x < 5; x++) {
    for (var y = 1; y <= board[x]; y++) {
      board[x] -= y;
      if (zeroSum()) {
        board[x] += y;
        px = x;
        py = y - 1;
        y = board[x];
        x = 5;
      } else {
        board[x] += y;
      }
    }
  }

  if (px == -1) {
    for (var x = 0; x < 5; x++) {
      if (board[x] >= 1) {
        px = x;
        x = 5;
      }
    }
  }

  updateBoard();
  setTimeout('computerPerform()', 1000);
}


function computer() {
  pieceOut(0, 0);
  updateBoard();

  currentPlayer = 2;
  el('player').innerHTML = "<h5 class='text-white mt-5'>El ordenador hace la siguiente jugada</h5>";
  setTimeout('computerSelect()', 1000);
}


function human() {
  el('player').innerHTML = "<h5 class='text-white mt-5'>Tú haces la siguiente jugada.</h5>";
  currentPlayer = 1;
}


function startComputer() {
  hide('none');
  updateBoard();
  computer();
  document.getElementById('text_').style.display = 'block';
}


function startHuman() {
  hide('none');
  updateBoard();
  human();
  document.getElementById('text_').style.display = 'block';
}

function hide(value){
  document.getElementById('bom').style.display = value;
  document.getElementById('text_').style.display = 'none';
}

function pvc(){
  document.getElementById('op1').style.display = 'none';
  document.getElementById('op2').style.display = 'block';
  startup();
}

function back(){
  hide('block');
  document.getElementById('op1').style.display = 'block';
  document.getElementById('op2').style.display = 'none';
}

//pvp
function pvp(){
  initial();
  document.getElementById('bom').style.display = 'none';
  document.getElementById('op1').style.display = 'none';
  document.getElementById('op2').style.display = 'block';
  document.getElementById('text_').style.display = 'block';
  human1();
}

function human1() {
  updateBoard();
  el('player').innerHTML = "<h5 class='text-white mt-5'>Jugador 1 hace la siguiente jugada.</h5>";
  currentPlayer = 3;
}

function human2() {
  updateBoard();
  el('player').innerHTML = "<h5 class='text-white mt-5'>Jugador 2 hace la siguiente jugada.</h5>";
  currentPlayer = 4;
}