/* --------------------
* function
-------------------- */
function showCovered(t) {
	event.preventDefault();
	var $n = $(t).next();
	$n.fadeIn();
}

function hideCovered(p) {
	event.preventDefault();
	var $p = $(p);
	$p.fadeOut();;
}


(function() {
/* --------------------
* ready
-------------------- */
'use strict';

$(document).ready(function() {
	setSmoothScroll();
	setLoading();
});

function setSmoothScroll(){
	$('a[href^="#"]').on('click',function(){
		var speed = 1000;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
}

function setLoading(){
	setTimeout(function(){
		$('#loading').fadeOut();
	},3000);
}

}());