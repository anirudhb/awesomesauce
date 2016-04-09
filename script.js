// jQuery
$ = require("jquery");

// body ready
$(window).load(function() {
	$(".beaker").hide();
	setTimeout(function() {
		$(".drop").addClass("quarter");
		setTimeout(function() {
			$(".beaker").fadeIn(800);
			setTimeout(function() {
				$(".drop").css({
					transform: "scale(0.25) translateY(2000px)"
				});
				setTimeout(function() {
					$(".liquid").addClass("fillred");
				}, 800);
				setTimeout(function() {
					$(".drop").addClass("top");
				}, 100);
				setTimeout(function() {
					$(".drop").removeClass("top");
				}, 300);
			}, 800);
		}, 800);
	}, 600);
});