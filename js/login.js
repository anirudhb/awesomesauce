// jQuery
$ = require("jquery");

// IPC (Inter-Process Communication)
ipc = require("electron").ipcRenderer;

// JSON File
jsonfile = require("jsonfile");
util = require("util");

// Pre-page load stuff
$(() => {
  $(".login").hide();
  $(".passput").hide();
  $(".dev-context-menu").hide();
});

// Set to true for development context menu and/or presentations
var dev = true;

// Page load stuff
$(window).load(() => {
  $(".icon").css({
    transform: "scale(1)"
  });
  setTimeout(() => {
    $(".login").fadeIn(800);
    setTimeout(() => {
      jsonfile.readFile(__dirname + "/../data/users.json", (err, users) => {
        if (err) {
          ipc.send("goToLogin");
          return;
        }
        for (var user of users) {
          var uID = $(document.createElement("li"));
          var name = $(document.createElement("h3"));
          uID.addClass("account");
          name.addClass("orange-text thin truncate name");
          name.text(user.name);
          if (user.icon === null) {
            var generic_face = $(document.createElement("i"));
            generic_face.addClass("material-icons circle face grey white-text");
            generic_face.text("person");
            uID.append(generic_face);
            uID.append(name);
          } else {
            var face = $(document.createElement("img"));
            face.addClass("circle face");
            if (user.icon == "google" && user.google === true && user.googleID != undefined && user.googleEmail != undefined) {
              $.ajax("https://www.googleapis.com/plus/v1/people/" + encodeURIComponent(user.googleID) + "?fields=image&key=AIzaSyAqefB-_LwBm-nIAIZsRRm8f6lHKdovLno", {
                success: (data, status, jqxhr) => {
                  name.text(user.name + " (" + user.googleEmail + ")");
                  face.css("background-image", "url(" + data.image.url + ")");
                  uID.append(face);
                  uID.append(name);
                },
                method: "GET",
                async: false
              });
            } else {
              face.css("background-image", "url(" + user.icon + ")");
              uID.append(face);
              uID.append(name);
            }
          }
          $(".accounts").append(uID);
        }
      });
    }, 800);
  }, 800);
  setTimeout(() => {
    $(".account").click(function() {
      if ($(this).find(".passput").length > 0) return;
      var caller = $(this);
      $(".account").each(function() {
        if (this != caller) {
          $(this).addClass("hidden");
          setTimeout(() => {
            $(this).hide();
          }, 800);
        }
      });
      $(this).removeClass("hidden");
      $(this).append($(".passput").clone().show());
      $(this).off("click");
      $(this).css({
        cursor: "default",
        width: "100%"
      });
      $(this).find("*").each(function() {
        if ($(this).attr("class") == "circle face" || $(this).attr("class") == "material-icons circle face grey white-text") {
          $(this).addClass("center-block");
          return;
        }
        if ($(this).parent().attr("class") == "input-field passput") return;
        $(this).css({
          width: "100%"
        });
      });
      setTimeout(() => {
        $(this).show();
      }, 800);
      $(this).find("input").keydown(function(e) {
        if (e.which == 13) {
          jsonfile.readFile(__dirname + "/../data/users.json", (err, users) => {
            if (err == true) return;
            for (var user of users) {
              var scope = $(this).parent().parent();
              var name = $(scope).find(".name");
              if (user.google === true && user.googleEmail != undefined) {
                if ($(name).text() == (user.name + " (" + user.googleEmail + ")")) {
                  if ($(this).val() == user.password) {
                    $(this).removeClass("valid");
                    $(this).removeClass("invalid")
                    $(this).addClass("valid");
                    $(scope).fadeOut(800);
                    // Future planning
                    ipc.send("setUser", {
                      name: user.name
                    });
                    setTimeout(() => {
                      ipc.send("loginWithCurrentUser");
                    });
                  } else {
                    $(this).removeClass("valid");
                    $(this).removeClass("invalid");
                    $(this).addClass("invalid");
                  }
                }
              } else {
                if (name.text() == user.name) {
                  if ($(this).text() == user.password) {
                    $(this).removeClass("valid");
                    $(this).removeClass("invalid");
                    $(this).addClass("valid");
                    // Future planning
                    ipc.send("setUser", {
                      name: user.name
                    });
                    ipc.send("logInWithCurrentUser");
                  } else {
                    $(this).removeClass("valid");
                    $(this).removeClass("invalid");
                    $(this).addClass("valid");
                  }
                }
              }
            }
          });
        }
      });
    });
  }, 2000);
  if (dev) {
    $(document.body).contextmenu((e) => {
      var x = e.clientX;
      var y = e.clientY;
      $(document.body).append($(".dev-context-menu").first().clone().show().css({
        left: x,
        top: y
      }));
      $(".reload").parent().click(() => {
        ipc.send("goToLogin");
      });
      $(".start-over").parent().click(() => {
        var win = require("remote").getCurrentWindow();
        win.loadURL("file://" + __dirname + "/../html/animation.html");
      });
      $(document.body).find("*").click(() => {
        if (!($(this) == ($(".dev-context-menu").last())) && !($(".dev-context-menu").last().contains($(this)))) {
          $(".dev-context-menu").last().remove();
        }
      })
    });
  }
});
