(function() {
  var $;

  $ = jQuery;

  $.fn.extend({
    ideyaboxSlider: function(options) {
      var IdeyaboxSlider, settings, slider;
      settings = {
        speed: 'normal',
        easing: 'linear',
        automargin: true,
        oneItem: false,
        play: false,
        interval: 3000,
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
      IdeyaboxSlider = (function() {

        function IdeyaboxSlider(sliderList, settings) {
          this.mainList = sliderList.find("ul");
          this.settings = settings;
        }

        IdeyaboxSlider.prototype.init = function() {
          var _this = this;
          this.addMainElements();
          this.setCallbacks();
          this.loadAndResize();
          $(window).resize(function() {
            return _this.loadAndResize();
          });
          this.sliderWrapper.find('li img').load(function() {
            return _this.showOrHideButtons();
          });
          if (this.settings.play) {
            return this.playSlider();
          }
        };

        IdeyaboxSlider.prototype.addMainElements = function() {
          this.sliderWrapper = this.mainList.wrap("<div class='ideyabox_slider' />").parent();
          this.mainList.after("<div class='clear'/>");
          this.items = this.sliderWrapper.find('li');
          this.firstItem = this.items.first();
          this.itemsAmount = this.items.length;
          this.prev_button = $("<a href='#' class='ideyabox_prev'>prev</a>").appendTo(this.sliderWrapper);
          if (this.settings.play) {
            this.stop_button = $("<a href='#' class='ideyabox_stop'>stop/start</a>").appendTo(this.sliderWrapper);
          }
          return this.next_button = $("<a href='#' class='ideyabox_next'>next</a>").appendTo(this.sliderWrapper);
        };

        IdeyaboxSlider.prototype.setCallbacks = function() {
          var _this = this;
          this.sliderWrapper.on('click', '.ideyabox_next', function(e) {
            e.preventDefault();
            if (!_this.allVisible()) {
              return _this.toLeft();
            }
          });
          this.sliderWrapper.on('click', '.ideyabox_prev', function(e) {
            e.preventDefault();
            if (!_this.allVisible()) {
              return _this.toRight();
            }
          });
          this.sliderWrapper.on('click', '.ideyabox_stop', function(e) {
            e.preventDefault();
            return _this.toggleStopStart(e.target);
          });
          return this.sliderWrapper.on('click', '.ideyabox_start', function(e) {
            e.preventDefault();
            return _this.toggleStopStart(e.target);
          });
        };

        IdeyaboxSlider.prototype.loadAndResize = function() {
          if (this.settings.automargin) {
            this.setItemsMargins();
          }
          this.showOrHideButtons();
          if (this.settings.oneItem) {
            return this.oneItem();
          }
        };

        IdeyaboxSlider.prototype.toggleStopStart = function(button) {
          if ($(button).hasClass('ideyabox_stop')) {
            clearInterval(this.playingSlider);
          } else {
            this.playSlider();
          }
          return $(button).toggleClass('ideyabox_start').toggleClass('ideyabox_stop');
        };

        IdeyaboxSlider.prototype.countItemsMargins = function() {
          var firstItem, itemMargin, itemWidth, sliderWrapperWidth, visibleItemsAmount;
          sliderWrapperWidth = this.sliderWrapper.width();
          firstItem = this.sliderWrapper.find('li').first();
          itemWidth = firstItem.outerWidth();
          visibleItemsAmount = Math.floor(sliderWrapperWidth / itemWidth);
          itemMargin = (sliderWrapperWidth - itemWidth * visibleItemsAmount) / (visibleItemsAmount - 1);
          if (visibleItemsAmount === 1) {
            itemMargin = sliderWrapperWidth - itemWidth;
          }
          return this.items.css('margin-right', "" + itemMargin + "px");
        };

        IdeyaboxSlider.prototype.setItemsMargins = function() {
          var margins;
          margins = this.countItemsMargins();
          return this.items.css('margin-right', "" + margins + "px");
        };

        IdeyaboxSlider.prototype.paddingsAndBordersWidth = function(item) {
          return item.outerWidth() - item.width();
        };

        IdeyaboxSlider.prototype.oneItem = function() {
          var firstItem, newItemWidth;
          firstItem = this.sliderWrapper.find('li').first();
          newItemWidth = this.sliderWrapper.width() - this.paddingsAndBordersWidth(firstItem);
          return this.sliderWrapper.find('li').width(newItemWidth);
        };

        IdeyaboxSlider.prototype.showOrHideButtons = function() {
          if (this.allVisible()) {
            this.prev_button.hide();
            return this.next_button.hide();
          } else {
            this.prev_button.show();
            return this.next_button.show();
          }
        };

        IdeyaboxSlider.prototype.allVisible = function() {
          var firstItem, itemWidth, itemsWidth, sliderWrapperWidth, visibleItemsAmount,
            _this = this;
          sliderWrapperWidth = this.sliderWrapper.width();
          this.items = this.sliderWrapper.find('li');
          firstItem = this.sliderWrapper.find('li').first();
          if (this.settings.automargin) {
            itemWidth = firstItem.outerWidth();
            visibleItemsAmount = Math.floor(sliderWrapperWidth / itemWidth);
            return visibleItemsAmount >= this.itemsAmount;
          } else {
            itemsWidth = 0;
            this.items.each(function(index, element) {
              return itemsWidth += $(element).outerWidth(true);
            });
            return sliderWrapperWidth >= itemsWidth - parseInt(this.items.last().css('margin-right'));
          }
        };

        IdeyaboxSlider.prototype.playSlider = function() {
          var _this = this;
          return this.playingSlider = setInterval(function() {
            return _this.toLeft();
          }, this.settings.interval);
        };

        IdeyaboxSlider.prototype.toLeft = function() {
          var clone, firstItem, itemFullWidth,
            _this = this;
          firstItem = this.sliderWrapper.find('li').first();
          if (!this.settings.automargin) {
            clone = firstItem.clone(true);
            clone.appendTo(this.mainList);
            firstItem.addClass('to_remove');
          }
          itemFullWidth = firstItem.outerWidth(true);
          this.settings.beforeMove();
          this.settings.beforeLeft();
          return this.mainList.animate({
            'left': "-" + itemFullWidth + "px"
          }, this.settings.speed, this.settings.easing, function() {
            if (_this.settings.automargin) {
              firstItem.appendTo(_this.mainList);
            } else {
              _this.sliderWrapper.find('.to_remove').remove();
            }
            _this.mainList.stop(true, true).css('left', '0');
            _this.settings.afterMove();
            return _this.settings.afterLeft();
          });
        };

        IdeyaboxSlider.prototype.toRight = function() {
          var itemClone, itemFullWidth, lastItem,
            _this = this;
          lastItem = this.sliderWrapper.find('li').last();
          itemFullWidth = lastItem.outerWidth(true);
          this.settings.beforeMove();
          this.settings.beforeRight();
          if (this.settings.automargin) {
            lastItem.prependTo(this.mainList);
          } else {
            this.sliderWrapper.find('.to_remove').remove();
            itemClone = lastItem.clone(true);
            itemClone.prependTo(this.mainList);
            lastItem.addClass('to_remove');
          }
          this.mainList.stop(true, true).css('left', "-" + itemFullWidth + "px");
          return this.mainList.animate({
            'left': "0"
          }, this.settings.speed, this.settings.easing, function() {
            _this.sliderWrapper.find('.to_remove').remove();
            _this.settings.afterMove();
            return _this.settings.afterRight();
          });
        };

        return IdeyaboxSlider;

      })();
      slider = new IdeyaboxSlider(this, settings);
      return slider.init();
    }
  });

}).call(this);
