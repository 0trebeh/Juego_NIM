document.getElementById("click_home").addEventListener('click', Action, false);
document.getElementById("click_play").addEventListener('click', Action, false);
document.getElementById("click_play_n").addEventListener('click', Action, false);
document.getElementById("click_rules").addEventListener('click', Action, false);
document.getElementById("click_play_v").addEventListener('click', Action, false);
document.getElementById("play_v").addEventListener('click', Action, false);

function Action(){

	document.getElementById('home').style.display = 'none';
	document.getElementById('play').style.display = 'none';
	document.getElementById('rules').style.display = 'none';
	document.getElementById('play_variant').style.display = 'none';

	if(this.id == 'click_home'){

		document.getElementById('home').style.display = 'block';
	}else if(this.id == 'click_play' | this.id == 'click_play_n'){

		document.getElementById('play').style.display = 'block';
	}else if(this.id == 'click_rules'){

		document.getElementById('rules').style.display = 'block';
	}else if(this.id == 'click_play_v' | this.id == 'play_v'){

		document.getElementById('play_variant').style.display = 'block';
	}
}