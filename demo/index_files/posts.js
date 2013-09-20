(function() {

  $(function() {
    var moveCallback, nextClickCallback, prevClickCallback;
    $('body').append('<ol />');
    $('body').append('<div class="counter" />');
    $('.image_wrapper').ideyaboxSlider({
      easing: 'easeOutCirc',
      speed: 'slow',
      automargin: true
    });
    $('.image_wrapper_na').ideyaboxSlider({
      easing: 'easeInOutQuad',
      speed: 'normal',
      automargin: false
    });
    $('.image_wrapper_one').ideyaboxSlider({
      easing: 'easeOutCubic',
      speed: 'slow',
      oneItem: true,
      afterMove: function() {
        return moveCallback();
      },
      afterLeft: function() {
        return nextClickCallback();
      },
      afterRight: function() {
        return prevClickCallback();
      }
    });
    moveCallback = function() {
      return $('.click_number b').text(function() {
        return parseInt($(this).text()) + 1;
      });
    };
    prevClickCallback = function() {
      return $('.prev_click_number b').text(function() {
        return parseInt($(this).text()) + 1;
      });
    };
    nextClickCallback = function() {
      return $('.next_click_number b').text(function() {
        return parseInt($(this).text()) + 1;
      });
    };
    $('.image_wrapper_html').ideyaboxSlider({
      easing: 'easeOutCubic'
    });
    return $('.image_wrapper_html_one').ideyaboxSlider({
      easing: 'easeOutCubic',
      oneItem: true
    });
  });

}).call(this);
