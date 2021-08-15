var board = [11];
var current_player = 0;
var px = -1;
var py = -1;

function test_game_over() {
  var over = false;
  if (board == 0) {
    over = true;
  }

  if (over) {
    var winner = "";
    if (current_player == 1) {
      winner = "Fin del partido. Jugador 1 Gano";
    } else {
      winner = "Fin del partido. Jugador 2 Gano";
    }
    alert(winner);

    board = [11];
    current_player = 0;
  }
}

function start_v(){
  var html = "<table class='mt-5' height='150' onmouseout='pieceO(0, 0)' style='margin-left: auto; margin-right: auto;'><tr>";
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < board[x]; y++) {
      var name = "./public/img/ficha1.png";
      if ((x == px) && (y <= py)) {
        name = "./public/img/ficha0.png";
      }
      if( y < 3){
        html += "<img class='hover' id='img" + x + y + "' style='margin-bottom: 5px; width: 100px; height: 100px;' src='" + name + "' onMouseDown=\"pieceClic(" + x + ", " + y + ")\" onMouseOver='pieceI(" + x + ", " + y + ")' onMouseOut='pieceO(" + x + ", " + y + ")'>";
      } else{
        html += "<img id='img" + x + y + "' style='margin-bottom: 5px; width: 100px; height: 100px;' src='" + name + "'>";
      }
    }
  }
  html += "<h1 class='text-white'>\\________________/</h1>";
  html += "<\/tr><\/table>";

  draw('game_v').innerHTML = html;
}

function draw(id){if (document.getElementById){return document.getElementById(id)}else if (window[id]){return window[id]}return null}

function pieceI(x, y) {
  if (current_player == 1 | current_player == 2) {
    if ((px != x) || (py != y)) {
      px = x;
      py = y;

      for (var iy = 0; iy < 3; iy++)
        if (iy <= y)
          draw('img' + x + iy).src = "./public/img/ficha0.png";
    }
  }

  return true;
}

function pieceO(x, y)
{
  if (current_player == 1 | current_player == 2) {
    px = -1;
    py = -1;

    for (var iy = 0; iy < 3; iy++)
      if (iy <= y)
        draw('img' + x + iy).src = "./public/img/ficha1.png";
  }

  return true;
}


function pieceClic(x, y) {
  pieceO(x, y);
  if (current_player == 1 | current_player == 2) {
    if(y < 3){
      board[x] -= y + 1;

      start_v();
      test_game_over();
      if (current_player == 1) {
        player2();
      }else{
        player1();
      }
    }
  }

  return true;
}

function player1() {
  start_v();
  draw('player_v').innerHTML = "<h5 class='text-white mt-5'>Jugador 1 hace la siguiente jugada.</h5>";
  current_player = 1;
}

function player2() {
  start_v();
  draw('player_v').innerHTML = "<h5 class='text-white mt-5'>Jugador 2 hace la siguiente jugada.</h5>";
  current_player = 2;
}

function start_variant(){
  board = [11];
  current_player = 0;
  px = -1;
  py = -1;
  player1();
}