function Tools(){
	/**
	 * Get screen size
	 */

	this.getW = function(){
		return screen.width;
	}

	this.getH = function(){
		return screen.height;
	}

	/**
	 * 全屏工具
	 */
	//进入全屏
	this.requestFullScreen = function() {
		var de = document.documentElement;
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		}
	}
	//退出全屏
	this.exitFullscreen = function() {
		var de = document;
		if (de.exitFullscreen) {
			de.exitFullscreen();
		} else if (de.mozCancelFullScreen) {
			de.mozCancelFullScreen();
		} else if (de.webkitCancelFullScreen) {
			de.webkitCancelFullScreen();
		}
	}

	/**
	 * Change Opacity
	 */
	this.moveOpacity = function(src, b, e, time){
		var timer = null;
		var speed = 0;
		var alpha = b;
		clearInterval(timer);
		timer = setInterval(function(){
			if(e > b){
				speed = 2;
			}
			else{
				speed = -2;
			}
			
			if(alpha == e){
				clearInterval(timer);
			}
			else{
				alpha = alpha + speed;
				src.style.opacity = (alpha / 100);
			}
		}, time / Math.abs(b - e) * 2);	
	} 

	/**
	 * Class operate
	 */
	function hasClass(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	this.addClass = function(obj, cls) {
		if (!hasClass(obj, cls)) obj.className += " " + cls;
	}

	this.removeClass = function(obj, cls) {
		if (hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	}
	}
	/**
	 * Get screen size
	 */

	this.getW = function(){
		return screen.width;
	}

	this.getH = function(){
		return screen.height;
	}

	/**
	 * 全屏工具
	 */
	//进入全屏
	this.requestFullScreen = function() {
		var de = document.documentElement;
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		}
	}
	//退出全屏
	this.exitFullscreen = function() {
		var de = document;
		if (de.exitFullscreen) {
			de.exitFullscreen();
		} else if (de.mozCancelFullScreen) {
			de.mozCancelFullScreen();
		} else if (de.webkitCancelFullScreen) {
			de.webkitCancelFullScreen();
		}
	}

	/**
	 * Change Opacity
	 */
	this.moveOpacity = function(src, b, e, time){
		var timer = null;
		var speed = 0;
		var alpha = b;
		clearInterval(timer);
		timer = setInterval(function(){
			if(e > b){
				speed = 2;
			}
			else{
				speed = -2;
			}
			
			if(alpha == e){
				clearInterval(timer);
			}
			else{
				alpha = alpha + speed;
				src.style.opacity = (alpha / 100);
			}
		}, time / Math.abs(b - e) * 2);	
	} 

	/**
	 * Class operate
	 */
	function hasClass(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	this.addClass = function(obj, cls) {
		if (!hasClass(obj, cls)) obj.className += " " + cls;
	}

	this.removeClass = function(obj, cls) {
		if (hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
}

