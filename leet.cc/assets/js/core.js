$(function(){
	new WOW().init();
});

function menu(opt) {
	if (opt === 1) {
		$("div#mnav").show()
		$(".right.mob").css('display', 'none');
		$('body').addClass('noscroll')
	}
	else {
		$("div#mnav").hide()
		//if ($(window).width() <= 759)
			$(".right.mob").css('display', 'block');
		$('body').removeClass('noscroll')
	}
}

document.addEventListener('touchmove', function (e) {
	if ($("body").hasClass("noscroll"))
		e.preventDefault();
});