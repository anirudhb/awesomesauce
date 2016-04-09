// jQuery
$ = require("jquery");

// Pre-page load stuff
$(function() {
	$(".beaker").hide();
	$(".title").hide();
	$(".login").hide();
});

// body ready
$(window).load(function() {
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
					$(".title").fadeIn(800);
					setTimeout(function() {
						$(".drop").css({
							transform: "scale(0.25)"
						});
						setTimeout(function() {
							$(".beaker").css({
								height: 0
							});
							setTimeout(function() {
								$(".drop").attr("style", null);
								$(".drop").removeClass("quarter");		
								setTimeout(function() {
									$(".beaker").hide();
									$(".title").fadeOut(800);
									setTimeout(function() {
										$(".login").fadeIn(800);
										setTimeout(function() {
											$(".drop").addClass("half");
										}, 800);
									}, 800);
								}, 800);
							}, 800);
						}, 800);
						setTimeout(function() {
							$(".drop").addClass("top");
						}, 200);
						setTimeout(function() {
							$(".drop").removeClass("top");
						}, 400);
					}, 800);
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