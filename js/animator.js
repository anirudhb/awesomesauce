// jQuery
$ = require("jquery");

// IPC (Inter-Process Communication)
ipc = require("electron").ipcRenderer;

// Pre-page load stuff
$(() => {
    $(".beaker").hide();
    $(".title").hide();
    $(".login").hide();
});

// body ready
$(window).load(() => {
    setTimeout(() => {
        $(".drop").addClass("quarter");
        setTimeout(() => {
            $(".beaker").fadeIn(800);
            setTimeout(() => {
                $(".drop").css({
                    transform: "scale(0.25) translateY(2000px)"
                });
                setTimeout(() => {
                    $(".liquid").addClass("fillred");
                    setTimeout(() => {
                        $(".title").fadeIn(800);
                        setTimeout(() => {
                            $(".drop").css({
                                transform: "scale(0.25)"
                            });
                            setTimeout(() => {
                                $(".beaker").css({
                                    height: 0
                                });
                                setTimeout(() => {
                                    $(".drop").attr("style", null);
                                    $(".drop").removeClass("quarter");
                                    setTimeout(() => {
                                        $(".beaker").hide();
                                        $(".title").fadeOut(800);
                                        $(".drop").fadeOut(800);
                                        setTimeout(() => {
                                          ipc.send("goToLogin");
                                        }, 800);
                                    }, 800);
                                }, 800);
                            }, 800);
                            setTimeout(() => {
                                $(".drop").addClass("top");
                            }, 200);
                            setTimeout(() => {
                                $(".drop").removeClass("top");
                            }, 400);
                        }, 800);
                    }, 800);
                }, 800);
                setTimeout(() => {
                    $(".drop").addClass("top");
                }, 100);
                setTimeout(() => {
                    $(".drop").removeClass("top");
                }, 300);
            }, 800);
        }, 800);
    }, 600);
});
