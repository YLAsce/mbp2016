function Rolling(){
	var page = new Page();
	/**Control
	 * 
	 */
	var loaded;
	/**
	 * Texts
	 */
	var title;
	var appendix;
	var text = new Array();

	var titleP = document.createElement('p');
	titleP.style.cssText="text-align:center;font-size:18px;font-family:SimHei;color:#D1EEEE;width:50%;height:10%;overFlow:hidden;margin:0;padding:0;border:0;position:absolute;z-index:7;top:9.5%;left:25%;";

	var appendixP = document.createElement('p');
	appendixP.style.cssText="text-align:center;font-family:SimHei;color:#8B0000;width:80%;height:10%;overFlow:hidden;margin:0;padding:0;border:0;position:absolute;z-index:7;top:75%;left:10%;";

	var textP = document.createElement('p');
	textP.style.cssText="text-align:center;font-size:28px;font-family:SimHei;color:#FFFFFF;width:80%;height:43%;overFlow:hidden;margin:0;padding:0;border:0;position:absolute;z-index:7;top:30%;left:11%;";
	textP.id = 'rolling_text';
	/**
	 * BaseElement
	 */
	var rollimg = document.getElementById('rollimg');
	var roll = document.getElementById('roll');
	/**
	 * Images
	 */
	var roll_bg = document.createElement('img');
	roll_bg.src = './images/roll_bg.png';
	roll_bg.style.cssText="width:37%;height:10%;overFlow:hidden;margin:0;padding:0;border:0;position:fixed;z-index:2;top:42%;left:32%;";

	var roll_content = document.createElement('img');
	roll_content.src = './images/roll_content.png';
	roll_content.style.cssText="opacity:0;width:36%;height:9%;overFlow:hidden;margin:0;padding:0;border:0;position:fixed;z-index:3;top:42%;left:32%;";

	var roll_pin = document.createElement('div');
	roll_pin.style.cssText="width:40%;height:11%;overFlow:hidden;margin:0;padding:0;border:0;position:fixed;z-index:4;top:41%;left:30%;";

	var roll_pin_pic = document.createElement('img');
	roll_pin_pic.src = './images/roll_pin.png';
	roll_pin_pic.style.cssText="width:100%;height:100%;overFlow:hidden;margin:0;padding:0;border:0;position:absolute;z-index:6;";

	var roll_board = document.createElement('div');
	roll_board.style.cssText="width:60%;height:50%;overFlow:hidden;margin:0;padding:0;border:0;position:fixed;z-index:5;top:25%;left:20%;";

	var roll_board_pic = document.createElement('img');
	roll_board_pic.src = './images/roll_board.png';
	roll_board_pic.style.cssText="width:100%;height:100%;overFlow:hidden;margin:0;padding:0;border:0;position:absolute;z-index:6;";

	var rotateLogo = document.createElement('img');
	rotateLogo.src = './images/cards_loading.gif';
	rotateLogo.style.cssText="width:6%;height:8%;overFlow:hidden;margin:0;padding:0;border:0;position:absolute;z-index:7;top:86.5%;left:47.3%;";

	/**
	 * Sounds
	 */
	var roll_pin_sound = new buzz.sound('./sounds/StartGame_window_loading_bar_move_down_and_forward.ogg');
	function playRollPinSound(){
		roll_pin_sound.play();
	}

	var roll_content_sound = new buzz.sound('./sounds/StartGame_filling_loop.ogg');
	roll_content_sound.loop();
	roll_content_sound.setVolume(60);
	function playRollContentSound(){
		roll_content_sound.play();
	}
	function stopRollContentSound(){
		roll_content_sound.stop();
	}

	var moveYOut_sound = new buzz.sound('./sounds/StartGame_window_loading_bar_move_down_and_forward.ogg');
	function playMoveYOutSound(){
		moveYOut_sound.play();
	}

	var content_drop = new buzz.sound('./sounds/StartGame_window_loading_bar_drop.ogg');
	function playContentDrop(){
		content_drop.play();
	}

	var noise = new buzz.sound('./sounds/tavern_wallah_loop_light.ogg');
	noise.loop();
	function playNoise(){
		noise.play();
	}
	function stopNoise(){
		noise.stop();
	}

	var some = new buzz.sound('./sounds/StartGame_window_expand_up.ogg');
	function playSome(){
		some.play();
	}

	/**
	 * Functions
	 */
	this.init = function(path){
		rollimg.src = path;
	}

	this.clearText = function(){
		text.length = 0;
	}

	this.addText = function(str){
		text.push(str);
	}

	this.setTitle = function(str){
		title = str;
	}

	this.setAppendix = function(str){
		appendix = str;
	}
	
	var timeOutPool = new Array();
	var timeOutIndex = 0;
	var tarPage;
	
	this.load = function(target, least_num){
		tarPage = target;
		playNoise();
		loaded = false;
		roll.appendChild(roll_bg);
		roll.appendChild(roll_content);
		
		roll_pin.appendChild(roll_pin_pic);
		roll_pin.appendChild(textP);
		roll.appendChild(roll_pin);
		
		roll_board.appendChild(roll_board_pic);
		roll_board.appendChild(rotateLogo);
		titleP.innerHTML = title;
		appendixP.innerHTML = appendix;
		roll_board.appendChild(titleP);
		roll_board.appendChild(appendixP);
		roll.appendChild(roll_board);
		
		timestamp = new Date().getTime();
		/**
		 * Anims
		 */
		for(var i=0; i<text.length; i++){
			timeOutPool[timeOutIndex++] = setTimeout(changeText, i*5000, i);
			//setTimeout(playSome, i*5000);
			timeOutPool[timeOutIndex++] = setTimeout(moveYIn, i*5000);
			timeOutPool[timeOutIndex++] = setTimeout(playRollPinSound, i*5000);
			timeOutPool[timeOutIndex++] = setTimeout(moveX, i*5000 + 600);
			timeOutPool[timeOutIndex++] = setTimeout(playSome, i*5000 + 600);
			timeOutPool[timeOutIndex++] = setTimeout(playRollContentSound, i*5000 + 600);
			timeOutPool[timeOutIndex++] = setTimeout(stopRollContentSound, i*5000 + 3200);
			timeOutPool[timeOutIndex++] = setTimeout(playContentDrop, i*5000 + 3200);
			//setTimeout(playSome, i*5000 + 3500);
			timeOutPool[timeOutIndex++] = setTimeout(playSome, i*5000 + 4200);
			timeOutPool[timeOutIndex++] = setTimeout(moveYOut, i*5000 + 4300);
			timeOutPool[timeOutIndex++] = setTimeout(playMoveYOutSound, i*5000 + 4300);
			timeOutPool[timeOutIndex++] = setTimeout(keep, i*5000 + 4300);
			if(i >= least_num - 1) timeOutPool[timeOutIndex++] = setTimeout(checkStatus, i*5000 + 4950);
		}
	}
	
	this.fin = function(){
		loaded = true;
	}
	
	function checkStatus(){
		if(loaded){
			var ite;
			for(ite = 0;ite < timeOutIndex;ite++){
				clearTimeout(timeOutPool[ite]);
			}
			unload(tarPage);
		}
	}
	function changeText(num){
		textP.innerHTML = text[num];
	}

	function keep(){
		roll_content.style.opacity = 0;
	}

	function moveX(){
		var tmp;
		var num = 0;
		var numL = 0;
		var numR = 36;
		var tmp = setInterval(function(){
			if(num == 100){
				clearInterval(tmp);
			}
			if(num == 0){
				roll_content.style.opacity = 100;
			}
			var nowL = numL + (numR-numL)*num/100;
			roll_content.style.width = nowL + '%';
			num += 2;
		}, 50);
	}

	function moveYIn(){
		var tmp;
		var num = 0;
		var numL = 32;
		var numR = 41;
		var tmp = setInterval(function(){
			if(num == 100){
				clearInterval(tmp);
			}
			var nowL = numL + (numR-numL)*num/100;
			roll_pin.style.top = nowL + '%';
			num += 2;
		}, 8);
	}

	function moveYOut(){
		var tmp;
		var num = 0;
		var numL = 41;
		var numR = 50;
		tmp = setInterval(function(){
			if(num == 100){
				clearInterval(tmp);
			}
			var nowL = numL + (numR-numL)*num/100;
			roll_pin.style.top = nowL + '%';
			num += 2;
		}, 8);
	}

	function unload(target){
		stopNoise();
		page.toPage(target);
	}
}
