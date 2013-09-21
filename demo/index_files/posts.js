(function() {

  $(function() {
    var beforeMoveCallback, beforeNextClickCallback, beforePrevClickCallback, moveCallback, nextClickCallback, prevClickCallback;
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
      play: true,
      interval: 3000,
      afterMove: function() {
        return moveCallback();
      },
      afterLeft: function() {
        return nextClickCallback();
      },
      afterRight: function() {
        return prevClickCallback();
      },
      beforeMove: function() {
        return beforeMoveCallback();
      },
      beforeLeft: function() {
        return beforeNextClickCallback();
      },
      beforeRight: function() {
        return beforePrevClickCallback();
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
    beforeMoveCallback = function() {
      return $('.before_click_number b').text(function() {
        return parseInt($(this).text()) + 1;
      });
    };
    beforeNextClickCallback = function() {
      return $('.before_prev_click_number b').text(function() {
        return parseInt($(this).text()) + 1;
      });
    };
    beforePrevClickCallback = function() {
      return $('.before_next_click_number b').text(function() {
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
