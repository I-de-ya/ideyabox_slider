(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    ideyaboxSlider: function(options) {
      var $firstItem, $items, $mainList, $next_button, $prev_button, $sliderWrapper, allVisible, countItemsMargins, init, itemsAmount, loadAndResize, navigation, oneItem, setItemsMargins, settings, showOrHideButtons;
      settings = {
        speed: 'normal',
        easing: 'linear',
        automargin: true,
        oneItem: false,
        afterMove: function() {},
        afterLeft: function() {},
        afterRight: function() {},
        beforeMove: function() {},
        beforeRight: function() {},
        beforeLeft: function() {}
      };
      settings = $.extend(settings, options);
      if (settings.oneItem) {
        settings.automargin = false;
      }
      $mainList = this.find("ul");
      $sliderWrapper = $mainList.wrap("<div class='ideyabox_slider' />").parent();
      $mainList.after("<div class='clear'/>");
      $items = $sliderWrapper.find('li');
      $firstItem = $items.first();
      itemsAmount = $items.length;
      $prev_button = $("<a href='#' class='ideyabox_prev'>prev</a>").appendTo($sliderWrapper);
      $next_button = $("<a href='#' class='ideyabox_next'>next</a>").appendTo($sliderWrapper);
      init = function() {
        $sliderWrapper.on('click', '.ideyabox_next', function(e) {
          e.preventDefault();
          if (!allVisible()) {
            return navigation.toLeft();
          }
        });
        $sliderWrapper.on('click', '.ideyabox_prev', function(e) {
          e.preventDefault();
          if (!allVisible()) {
            return navigation.toRight();
          }
        });
        loadAndResize();
        $(window).resize(function() {
          return loadAndResize();
        });
        return $sliderWrapper.find('li img').load(function() {
          return showOrHideButtons();
        });
      };
      loadAndResize = function() {
        if (settings.automargin) {
          setItemsMargins();
        }
        showOrHideButtons();
        if (settings.oneItem) {
          return oneItem();
        }
      };
      oneItem = function() {
        var sliderWrapperWidth;
        sliderWrapperWidth = $sliderWrapper.width();
        return $sliderWrapper.find('li').width(sliderWrapperWidth);
      };
      showOrHideButtons = function() {
        if (allVisible()) {
          $prev_button.hide();
          return $next_button.hide();
        } else {
          $prev_button.show();
          return $next_button.show();
        }
      };
      countItemsMargins = function() {
        var itemMargin, itemWidth, sliderWrapperWidth, visibleItemsAmount;
        sliderWrapperWidth = $sliderWrapper.width();
        itemWidth = $firstItem.width();
        visibleItemsAmount = Math.floor(sliderWrapperWidth / itemWidth);
        itemMargin = (sliderWrapperWidth - itemWidth * visibleItemsAmount) / (visibleItemsAmount - 1);
        if (visibleItemsAmount === 1) {
          itemMargin = sliderWrapperWidth - itemWidth;
        }
        return $items.css('margin-right', "" + itemMargin + "px");
      };
      setItemsMargins = function() {
        var margins;
        margins = countItemsMargins();
        return $items.css('margin-right', "" + margins + "px");
      };
      allVisible = function() {
        var itemWidth, itemsWidth, sliderWrapperWidth, visibleItemsAmount;
        sliderWrapperWidth = $sliderWrapper.width();
        $items = $sliderWrapper.find('li');
        if (settings.automargin) {
          itemWidth = $firstItem.width();
          visibleItemsAmount = Math.floor(sliderWrapperWidth / itemWidth);
          return visibleItemsAmount >= itemsAmount;
        } else {
          itemsWidth = 0;
          $items.each(function() {
            return itemsWidth += $(this).width() + parseInt($(this).css('margin-right'));
          });
          return sliderWrapperWidth >= itemsWidth - parseInt($items.last().css('margin-right'));
        }
      };
      navigation = {
        toLeft: function() {
          var clone, itemMargin, itemWidth;
          $firstItem = $sliderWrapper.find('li').first();
          if (!settings.automargin) {
            clone = $firstItem.clone(true);
            clone.appendTo($mainList);
            $firstItem.addClass('to_remove');
          }
          itemWidth = $firstItem.width();
          itemMargin = parseInt($firstItem.css('margin-right'));
          settings.beforeMove();
          settings.beforeLeft();
          return $mainList.animate({
            'left': "-" + (itemWidth + itemMargin) + "px"
          }, settings.speed, settings.easing, function() {
            if (settings.automargin) {
              $firstItem.appendTo($mainList);
            } else {
              $sliderWrapper.find('.to_remove').remove();
            }
            $mainList.stop(true, true).css('left', '0');
            settings.afterMove();
            return settings.afterLeft();
          });
        },
        toRight: function() {
          var $lastItem, itemClone, itemMargin, itemWidth;
          $lastItem = $sliderWrapper.find('li').last();
          itemWidth = $lastItem.width();
          itemMargin = parseInt($lastItem.css('margin-right'));
          settings.beforeMove();
          settings.beforeRight();
          if (settings.automargin) {
            $lastItem.prependTo($mainList);
          } else {
            $sliderWrapper.find('.to_remove').remove();
            itemClone = $lastItem.clone(true);
            itemClone.prependTo($mainList);
            $lastItem.addClass('to_remove');
          }
          $mainList.stop(true, true).css('left', "-" + (itemWidth + itemMargin) + "px");
          return $mainList.animate({
            'left': "0"
          }, settings.speed, settings.easing, function() {
            if (!settings.automargin) {
              $sliderWrapper.find('.to_remove').remove();
            }
            settings.afterMove();
            return settings.afterRight();
          });
        }
      };
      return init();
    }
  });

}).call(this);
