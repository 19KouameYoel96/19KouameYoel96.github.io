$(document).ready(function () {
  autoPlayYouTubeModal();
  document.querySelector("#current-year").innerHTML= new Date().getFullYear();
});

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

$(document).ready(function() {
	$(window).scroll(function() {
	  if ($(this).scrollTop() > 63) {
      $('.nav-background').css("background" , "rgba(255, 255, 255, 0.9)");
      $('.navtwo').css("background" , "white");
      $('.nav-link').css("color" , "#100d5c");
      $('.unserious').css("color" , "#100d5c");
      $('.unseriousone').css("color" , "#100d5c");
      $('.home-logo').attr('src','wp-content/themes/dangote/assets/img/dangote-blue.svg');
      $('.home-logotwo').attr('src','wp-content/themes/dangote/assets/img/dangote-blue.svg');
	  } else {   
      $('.navtwo').css("background" , "white");   
      $('.nav-background').css("background" , "transparent");
      $('.nav-link').css("color" , "white");
      $('.unserious').css("color" , "white");
      $('.unseriousone').css("color" , "#100d5c");
      $('.home-logo').attr('src','wp-content/themes/dangote/assets/img/logo-svg.svg');
      $('.home-logotwo').attr('src','wp-content/themes/dangote/assets/img/dangote-blue.svg');
	  }
	});
});

$(window).scroll(function () {
  console.log($(window).scrollTop())
  if ($(window).scrollTop() > 63) {
    $('.navtwo').addClass('navbar-sticky');
  }
  if ($(window).scrollTop() < 64) {
    $('.navtwo').removeClass('navbar-sticky');
  }
});


$(window).scroll(function () {
  console.log($(window).scrollTop())
  if ($(window).scrollTop() > 63) {
    $('.nav-background').addClass('navbar-fixed');
  }
  if ($(window).scrollTop() < 64) {
    $('.nav-background').removeClass('navbar-fixed');
  }
});

$('#myCarousel').carousel({
  interval: false
});

$("#myCarousel").on("touchstart", function(event){

  var yClick = event.originalEvent.touches[0].pageY;

  $(this).one("touchmove", function(event){

    var yMove = event.originalEvent.touches[0].pageY;
      if( Math.floor(yClick - yMove) > 1 ){
        $(".carousel").carousel('next');
      }
      else if( Math.floor(yClick - yMove) < -1 ){
        $(".carousel").carousel('prev');
      }
  });

  $(".carousel").on("touchend", function(){
    $(this).off("touchmove");
  });

});


$( document ).ready(function () {
    $(".moreBox").slice(0, 3).show();
    if ($(".blogBox:hidden").length != 0) {
      $(".loadMore").show();
    }   
    $(".loadMore").on('click', function (e) {
      e.preventDefault();
      $(".moreBox:hidden").slice(0, 6).slideDown();
      if ($(".moreBox:hidden").length == 0) {
        $(".loadMore").fadeOut('slow');
      }
    });
  });

function autoPlayYouTubeModal() {
  var trigger = $('.videoModalTriger');
      trigger.click(function () {
        var theModal = $(this).data("target");
        var videoSRC = $(this).attr("data-videoModal");
        var videoSRCauto = videoSRC + "?autoplay=1";
        $(theModal + ' iframe').attr('src', videoSRCauto);
        $(theModal).on('hidden.bs.modal', function (e) {
            $(theModal + ' iframe').attr('src', '');
        });
  });
};

jQuery(function($) {
  if ($(window).width() > 769) {
    $('.navbar .dropdown').hover(function() {
      $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();

    }, function() {
      $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();

    });

    $('.navbar .dropdown > a').click(function() {
      location.href = this.href;
    });

  }
});

