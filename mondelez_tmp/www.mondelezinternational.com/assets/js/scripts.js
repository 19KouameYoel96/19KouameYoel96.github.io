// polyfill for Internet Explorer
// https://stackoverflow.com/a/50756253/1703519
(function (w) {

  w.URLSearchParams = w.URLSearchParams || function (searchString) {
    var self = this;
    self.searchString = searchString;
    self.get = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
      if (results == null) {
        return null;
      }
      else {
        return decodeURI(results[1]) || 0;
      }
    };
  }

})(window)

function equalHeights($el){
  $el.css("height", "auto");
  var height = 0;

  $el.each(function(k, v){
    var el_height = $(v).height();
    if(el_height > height)
    height = el_height;
  })

  $el.height(height);
}

function selectCountry(event){
  console.log(event.target.value);
  $(".show-country").hide();
  $(".show-country[data-country-id="+event.target.value+"]").show();
}

function sizeBrandCircle(){
  $(".brand-listing .brand .image").css("height", "auto");

  $(".brand-listing .brand .image .circle").each(function(){
    var height = $(this).height();

    $(this).parent().height(height)
  })
}

function applyBrandFilters(){
  var $filters = $(".brand-listing .filters p.activated");
  var text = "";
  if($filters.length > 0){
    text = "(" + $filters.length + ")";

    $(".brand-listing [data-types]").each(function(){
      var $this = $(this);
      $this.hide();

      $filters.each(function(){
        var types = $this.data("types");
        if(types.indexOf($(this).data("filter")) != -1){
          $this.show();
        }
      })
    })
  } else {
    $(".brand-listing [data-types]").show();
  }

  $(".brand-listing .selected-filter  span.count").html(text);
}

function screenWidth(){
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function openMenuSection(that){
  var $this = $(that);

  if($this.parent().hasClass("open")){
    $this.siblings("ul").slideUp();
    $this.parent().removeClass("open");
  } else {
    $this.siblings("ul").slideDown();
    $this.parent().addClass("open");
  }

  return false;
}

function playVideo(that){
  var $this = $(that);
  var $videoContainer = $this.parent().siblings(".video-container");
  var videoId  = $videoContainer.data("video-id");

  $videoContainer.find("iframe").attr("src", "https://www.youtube.com/embed/" + videoId + "?autoplay=1");
  $this.parent().hide();
  $videoContainer.show();
}

function brandFilterToggle(that){
  var $this = $(that);

  $this.siblings(".filters").slideToggle();
  $this.find(".fa-plus").toggleClass("hidden");
  $this.find(".fa-minus").toggleClass("hidden");
}

function openAdvancedTab(that){
  var $this = $(that);
  var tabId = $this.data("id");

  if(!$this.hasClass("open")){
    $(".tab-advanced .tab-row [data-id]").removeClass("open");
    $this.addClass("open");
    if(!$(".tab-advanced .tab-row").hasClass("tab-opened")){
      $(".tab-advanced .tab-row").addClass("tab-opened");
      setTimeout(function(){
        if($(".tab-advanced .result:visible").length > 0){
          $(".tab-advanced .result:visible").slideUp(function(){
            $(".tab-advanced .result[data-id="+tabId+"]").slideDown();
          });
        } else {
          $(".tab-advanced .result[data-id="+tabId+"]").slideDown();
        }
      }, 600)
    } else {
      if($(".tab-advanced .result:visible").length > 0){
        $(".tab-advanced .result:visible").slideUp(function(){
          $(".tab-advanced .result[data-id="+tabId+"]").slideDown();
        });
      } else {
        $(".tab-advanced .result[data-id="+tabId+"]").slideDown();
      }
    }
  } else {
    $(".tab-advanced .tab-row [data-id]").removeClass("open");
    $(".tab-advanced .tab-row").removeClass("tab-opened");
    $(".tab-advanced .result").slideUp();
  }
}

$(function(){

  // SOCIAL
  if(typeof addthis !== "undefined"){
    addthis.share({
      'container_selector':'.social-links',
      'button_selector': '.addthis_share_button'
    });
  }

  // TOP NAV
  $(".top-nav .with-menu > a").on("click", function(){
    var $this = $(this);

    $this.parent().toggleClass("open");
    return false;
  })

  $(".top-nav .with-menu > a").on("keydown", function(e){
    if(e.keyCode == 13){
      var $this = $(this);

      $this.parent().toggleClass("open");
      return false;
    }
  })

  $(".top-nav .sub-menu .section .section-title:not(.empty)").on("click", function(){
    openMenuSection(this);
  })

  $(".top-nav .sub-menu .section .section-title:not(.empty)").on("keydown", function(e){
    if(e.keyCode == 13){
      openMenuSection(this);
    }
  })

  $(document).mouseup(function(e)
  {
    var container = $(".top-nav .sub-menu");

    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      container.siblings("ul").slideUp();
      container.parent().removeClass("open");
    }
  });

  // MEGA MENU
  $(".main-nav a[data-mega-menu-id]").on("click", function(){
    var $this = $(this);

    if($this.hasClass("selected")){
      $this.removeClass("selected");
    } else {
      $(".main-nav a[data-mega-menu-id]").removeClass("selected");
      $this.addClass("selected");
    }

    var menuId = $this.data("mega-menu-id");

    if(!$(".mega-menu [data-mega-menu-id="+menuId+"]").hasClass("open")){
      $(".mega-menu").show();
      if($(".mega-menu .row.open").length > 0){
        $(".main-nav .child-menu, .main-nav .sub-child-menu").hide();
        $(".mega-menu a.selected").removeClass("selected");
        $(".mega-menu .row.open").slideUp(function(){
          $(this).removeClass("open");
          $(".mega-menu [data-mega-menu-id="+menuId+"]").addClass("open");
          $(".mega-menu [data-mega-menu-id="+menuId+"]").slideDown({
            start: function () {
              $(this).css({
                display: "flex"
              })
            }
          });
        })
      } else {
        $(".mega-menu [data-mega-menu-id="+menuId+"]").removeClass("open");
        $(".mega-menu [data-mega-menu-id="+menuId+"]").addClass("open");
        $(".mega-menu [data-mega-menu-id="+menuId+"]").slideDown({
          start: function () {
            $(this).css({
              display: "flex"
            })
          }
        });
      }
    } else {
      $(".mega-menu .row").removeClass("open");
      $(".main-nav .child-menu, .main-nav .sub-child-menu").hide();
      $(".mega-menu a.selected").removeClass("selected");
      $(".mega-menu [data-mega-menu-id="+menuId+"]").slideUp(function(){
        $(".mega-menu").hide();
      });
    }

    return false;
  })

  $(document).mouseup(function(e)
  {
    var container = $("header")

    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      container.find(".mega-menu .row.open").slideUp(function(){
        $(".mega-menu").hide();
        container.find(".mega-menu .row.open").removeClass("open");
        container.find(".mega-menu a.selected").removeClass("selected");
        container.find(".main-nav .child-menu, .main-nav .sub-child-menu").hide();
      });
      container.find(".main-nav a[data-mega-menu-id]").removeClass("selected");
    }
  });

  $(".mega-menu .col-2 a[data-child-menu-id]").on("click", function(){
    var $this = $(this);

    $this.parent().siblings("li").find("a[data-child-menu-id]").removeClass("selected");
    $this.addClass("selected");

    var childId = $this.data("child-menu-id");
    var childMenuParent = $(".mega-menu .col-2 ul[data-menu-id="+childId+"]").closest(".col-2");
    childMenuParent.find("ul").hide();
    childMenuParent.show();
    if(childMenuParent.hasClass("child-menu")){
      $(".mega-menu .sub-child-menu").hide();
    }
    $(".mega-menu .col-2 ul[data-menu-id="+childId+"]").show();

    return false;
  })

  // MOBILE MENU
  $(".mobile-menu .mobile-mega-menu a.with-menu").on("click", function(){
    var $this = $(this);

    $this.toggleClass("open");

    $this.parent().find("> ul").slideToggle();

    return false;
  })

  $(".mobile-header .menu-toggle").on("click", function(){
    var $this = $(this);

    $this.toggleClass("activated");
    $(".mobile-menu").slideToggle();

    return false;
  })

  // SEARCH TOGGLE
  $(".top-nav .search-toggle, .mobile-header .search-toggle").on("click", function(){
    $(".top-nav .search-toggle, .mobile-header .search-toggle").toggleClass("activated");
    $(".search-bar").slideToggle();

    return false;
  })

  $(".search-bar input, .search-input input").keypress(function (e) {
    if (e.which == 13) {
      window.location.href = "/search" + "?term=" + $(this).val();
      return false;
    }
  });

  $(".search-bar .search-button, .search-input .search-button").on("click", function (e) {
    window.location.href = "/search" + "?term=" + $(this).siblings("input").val();
    return false;
  });

  // STOCK PRICE
  var stockPriceString = $(".top-nav .stock-ticker").html();
  $(".mobile-stock-price p").html(stockPriceString);

  // VIDEOS
  $(".play-button-container").on("click", function(){
    playVideo(this);
  })

  $(".play-button-container").on("keydown", function(e){
    if(e.keyCode == 13){
      playVideo(this);
    }
  })

  // COOKIES
  var cookiePolicy = Cookies.get('cookie-policy');

  if(cookiePolicy == null || cookiePolicy != 'agreed'){
    $(".cookie-policy").show();
  }

  $(".cookie-policy .cta.accept").on("click", function(){
    $(this).closest(".cookie-policy").hide();
    Cookies.set('cookie-policy', 'agreed', { expires: 365 });
    return false;
  })

  $('.cookie-policy .fa-plus').on("click", function(){
    var $this = $(this);

    $this.hide();
    $this.siblings(".fa-minus").show();
    $(".cookie-policy .text").slideDown();
  })

  $('.cookie-policy .fa-times').on("click", function(){
    Cookies.set('cookie-policy', 'agreed', { expires: 365 });
    $(".cookie-policy").hide();
  })

  $('.cookie-policy .fa-times').on("keydown", function(e){
    if(e.keyCode == 13){
      Cookies.set('cookie-policy', 'agreed', { expires: 365 });
      $(".cookie-policy").hide();
    }
  })

  $('.cookie-policy .fa-minus').on("click", function(){
    var $this = $(this);

    $this.hide();
    $this.siblings(".fa-plus").show();
    $(".cookie-policy .text").slideUp();
  })

  // TAB ADVANCED
  $(".tab-advanced .tab-row [data-id]").on("click", function(){
    openAdvancedTab(this);
  })

  $(".tab-advanced .tab-row [data-id]").on("keydown", function(e){
    if(e.keyCode == 13){
      openAdvancedTab(this);
    }
  })

  if(screenWidth() < 768){
    $(".tab-advanced .tab-row [data-id]").each(function(){
      var $this = $(this);
      var tabId = $this.data("id");

      $(".tab-advanced .result-row .result[data-id="+tabId+"]").insertAfter($this);
    })
  }

  // SLIDER BANNER
  var sliderBannerInitilaized = false;

  $('.slider-banner .slider').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  })

  // NEWSROOM
  if(screenWidth() < 768){
    $('.newsroom .row.items').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      variableWidth: true
    })
  }

  if(screenWidth() < 768){
    $('.quick-facts').addClass("with-slider")
  }

  // QUICK FACTS
  $('.quick-facts.with-slider .row.items').each(function(){
    if($(this).find(".col-md-4").length > 4 || screenWidth() < 768){
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        infinite: true,
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows: false,
              variableWidth: true
            }
          }
        ]
      })
    }
  })

  // TIMELINE
  $('.timeline.image-slider .slider').slick({
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    arrows: true,
    infinite: false,
    draggable: false,
    asNavFor: '.timeline.year-slider .slider',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '60px',
        }
      }
    ]
  });

  $('.timeline.year-slider .slider').slick({
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 7,
    arrows: false,
    infinite: false,
    draggable: false,
    focusOnSelect: true,
    asNavFor: '.timeline.image-slider .slider',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  });

  // STOCK INFORMATION
  $('.stock-information .slider').slick({
    slidesToShow: 3,
    arrows: true,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1346,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
          variableWidth: true
        }
      }
    ]
  });

  // BRAND FILTERS
  $(".brand-listing .selected-filter, .brand-stories .selected-filter").on("click", function(){
    brandFilterToggle(this);
  })

  $(".brand-listing .selected-filter, .brand-stories .selected-filter").on("keydown", function(e){
    if(e.keyCode == 13){
      brandFilterToggle(this);
    }
  })

  $(".brand-listing .filters li p").on("click", function(){
    var $this = $(this);

    $this.toggleClass("activated");

    applyBrandFilters();
  })

  $(".brand-listing .filters li p").on("keydown", function(e){
    if(e.keyCode == 13){
      var $this = $(this);

      $this.toggleClass("activated");

      applyBrandFilters();
    }
  })

  $(".brand-listing .filters p.clear").on("click", function(){
    var $this = $(this);

    $(".brand-listing .filters li p").removeClass("activated");

    applyBrandFilters();
  })

  $(".brand-listing .filters p.clear").on("keydown", function(e){
    if(e.keyCode == 13){
      var $this = $(this);

      $(".brand-listing .filters li p").removeClass("activated");

      applyBrandFilters();
    }
  })

  const urlParams = new URLSearchParams(window.location.search);
  var brandTypes = urlParams.get('type');
  if(brandTypes != null){
    brandTypes = brandTypes.split("|");
    brandTypes.forEach(function(filter){
      $(".brand-listing .filters li p[data-filter='"+filter+"']").addClass("activated");
      applyBrandFilters();
    });
  }

  $(document).mouseup(function(e)
  {
    var container = $(".selected-filter, .filters");

    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
      container.parent().find(".filters").slideUp();
      container.find(".fa-plus").removeClass("hidden");
      container.find(".fa-minus").addClass("hidden");
    }
  });

  // TOP LINK
  $(".top-link").on("click", function(){
    $(window).scrollTop(0);
  })

  // Contact Form
  $("#contact-form").submit(function (e) {
    if (grecaptcha.getResponse() == "") {
      e.preventDefault();
      $(".recaptcha-validation-error").show();
    } else {
      $(".recaptcha-validation-error").hide();
    }
  });


  sizeBrandCircle();
  equalHeights($("footer h3"));
  equalHeights($('.quick-facts .row.items .col-12'));
  equalHeights($(".additional-resources .col-12 a"));
  equalHeights($(".newsroom .col-md > a"));
  equalHeights($(".column-containers .contact .info"));
  $(window).resize(function(){
    sizeBrandCircle();
    equalHeights($("footer h3"));
    equalHeights($('.quick-facts .row.items .col-12'));
    equalHeights($(".additional-resources .col-12 a"));
    equalHeights($(".newsroom .col-md > a"));
    equalHeights($(".column-containers .contact .info"));
  });
})
