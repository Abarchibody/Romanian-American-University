(function ($) {
  $.fn.extend({
    rotaterator: function (options) {
      var defaults = {
        fadeSpeed: 500,
        pauseSpeed: 100,
        child: null
      };

      var options = $.extend(defaults, options);

      return this.each(function () {
        var o = options;
        var obj = $(this);
        var items = $(obj.children(), obj);
        items.each(function () {
          $(this).hide();
        });
        if (!o.child) {
          var next = $(obj).children(":first");
        } else {
          var next = o.child;
        }
        $(next).fadeIn(o.fadeSpeed, function () {
          $(next)
            .delay(o.pauseSpeed)
            .fadeOut(o.fadeSpeed, function () {
              var next = $(this).next();
              if (next.length == 0) {
                next = $(obj).children(":first");
              }
              $(obj).rotaterator({
                child: next,
                fadeSpeed: o.fadeSpeed,
                pauseSpeed: o.pauseSpeed
              });
            });
        });
      });
    }
  });
})(jQuery);

$(document).ready(function () {
  // Check for video loading complete
  var video = document.getElementById("tm-welcome-video");

  video.onloadeddata = function () {
    $("#tm-video-text-overlay").removeClass("d-none");
    $("#tm-video-loader").addClass("d-none");

    $("#rotate").rotaterator({
      fadeSpeed: 1000,
      pauseSpeed: 300
    });
  };

  // Update year in copyright text
  document.querySelector(".tm-current-year").textContent =
    new Date().getFullYear();

  // Get the current longitude and latitude
  const lat = document.getElementById("set-lat");
  const long = document.getElementById("set-long");

  function showPosition(position) {
    lat.innerText = position.coords.latitude;
    long.innerText = position.coords.longitude;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    lat.innerText = "N/A.";
    long.innerText = "N/A.";
  }
});
