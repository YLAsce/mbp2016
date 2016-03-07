function Main(){
	var page = new Page();
	var tools = new Tools();
	var cover = new Cover();

	var wel_pic = document.getElementById('wel_pic');
	var wel_dialog = document.getElementById('wel_dialog');
	var wel_button = document.getElementById('wel_button');
	var greeting = new buzz.sound('./sounds/VO_HERO_01_Greetings_01.ogg');
	
	/**
	 * override setTimeout
	 */

	var __sto = setTimeout; 
	window.setTimeout = function(callback,timeout,param) 
	{ 
		var args = Array.prototype.slice.call(arguments,2); 
		var _cb = function() 
		{ 
			callback.apply(null,args); 
		} 
		return __sto(_cb,timeout); 
	}

	wel_button.onclick=function(){
		tools.requestFullScreen();
		cover.init();
		page.setTransition('zoomCover');
		setTimeout(page.toPage, 1000, 'dashboard', 'big');
		setTimeout(cover.load, 200);
	}
	
	function playGreeting(){
		greeting.play();
	}
	
	this.play = function(){
		wel_dialog.style.opacity = 0;
		wel_button.style.opacity = 0;

		setTimeout(playGreeting,2000);
		setTimeout(tools.moveOpacity, 1500, wel_dialog, 0, 100, 1000);
		setTimeout(tools.moveOpacity, 8000, wel_button, 0, 100, 1000);
	}
}

var main = new Main();
main.play();
	







