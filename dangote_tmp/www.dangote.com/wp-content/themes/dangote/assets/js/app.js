
$(document).ready(function() {
    $('#fullpage').fullpage({
      navigation: true,
      navigationPosition: 'right',
      showActiveTooltip: true,
      controlArrows:false,
      slideSelector:'.sliding',
      scrollBar:true,
      scrollingSpeed: 1500,
    });
});

$('#section07').on('click',function() {
    $("#fullpage").fullpage.moveTo($(this).index() + 0);
});

