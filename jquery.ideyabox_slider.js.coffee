$ = jQuery
$.fn.extend
  ideyaboxSlider: (options) ->

    settings =
      speed: 'normal'
      easing: 'linear'
      automargin: true
      oneItem: false
      afterMove: ->
      afterLeft: ->
      afterRight: ->

    settings = $.extend settings, options   
    settings.automargin = false if settings.oneItem


    class IdeyaboxSlider
      constructor: (sliderList, settings) ->
        @mainList = sliderList.find("ul")
        @settings = settings

      init: ->
        @.addMainElements()
        @.setCallbacks()

        @.loadAndResize()
        $(window).resize =>
          @.loadAndResize()

        @sliderWrapper.find('li img').load =>
          @.showOrHideButtons()

      setCallbacks: ->
        @sliderWrapper.on 'click', '.ideyabox_next', (e) =>
          e.preventDefault()
          @.toLeft() unless @.allVisible()

        @sliderWrapper.on 'click', '.ideyabox_prev', (e) =>
          e.preventDefault()
          @.toRight() unless @.allVisible()

      addMainElements: ->
        @sliderWrapper = @mainList.wrap("<div class='ideyabox_slider' />").parent()
        @mainList.after("<div class='clear'/>")
        @items = @sliderWrapper.find('li')
        @firstItem = @items.first()
        @itemsAmount = @items.length
        @prev_button = $("<a href='#' class='ideyabox_prev'>prev</a>").appendTo(@sliderWrapper)
        @next_button = $("<a href='#' class='ideyabox_next'>next</a>").appendTo(@sliderWrapper)

      loadAndResize: ->
        @.setItemsMargins() if @settings.automargin
        @.showOrHideButtons()
        @.oneItem() if @settings.oneItem

      # count items margins
      countItemsMargins: ->
        sliderWrapperWidth = @sliderWrapper.width()
        firstItem = @sliderWrapper.find('li').first()
        itemWidth = firstItem.outerWidth()

        visibleItemsAmount = Math.floor(sliderWrapperWidth/itemWidth)

        itemMargin = (sliderWrapperWidth - itemWidth*visibleItemsAmount)/(visibleItemsAmount - 1)
        if visibleItemsAmount is 1 then itemMargin = sliderWrapperWidth - itemWidth
        @items.css('margin-right', "#{itemMargin}px")
      
      setItemsMargins: ->
        margins = @.countItemsMargins()
        @items.css('margin-right', "#{margins}px")

      paddingsAndBordersWidth: (item) ->
        item.outerWidth() - item.width()

      oneItem: ->
        sliderWrapperWidth = @sliderWrapper.width()
        firstItem = @sliderWrapper.find('li').first()
        @sliderWrapper.find('li').width(sliderWrapperWidth - @.paddingsAndBordersWidth(firstItem))

      # hide next and prev buttons if all visible
      showOrHideButtons: ->
        if @.allVisible()
          @prev_button.hide()
          @next_button.hide()
        else
          @prev_button.show()
          @next_button.show()  

      # check if all items visible
      allVisible: ->
        sliderWrapperWidth = @sliderWrapper.width()
        @items = @sliderWrapper.find('li')
        firstItem = @sliderWrapper.find('li').first()
        if @settings.automargin
          itemWidth = firstItem.outerWidth()
          visibleItemsAmount = Math.floor(sliderWrapperWidth/itemWidth)
          visibleItemsAmount >= @itemsAmount
        else
          itemsWidth = 0
          @items.each (index, element) =>
            itemsWidth += $(element).outerWidth(true)
          sliderWrapperWidth >= itemsWidth - parseInt(@items.last().css('margin-right'))

      toLeft: ->
        firstItem = @sliderWrapper.find('li').first()

        unless @settings.automargin

          clone = firstItem.clone(true)
          clone.appendTo(@mainList)
          firstItem.addClass('to_remove') 

        itemFullWidth = firstItem.outerWidth(true)

        @mainList.animate({'left': "-#{itemFullWidth}px"}, @settings.speed, @settings.easing, =>
          if settings.automargin
            firstItem.appendTo(@mainList)
          else
            @sliderWrapper.find('.to_remove').remove()
          @mainList.stop(true, true).css('left', '0')
          @settings.afterMove()
          @settings.afterLeft()
        )

      toRight: ->
        lastItem = @sliderWrapper.find('li').last()
        itemFullWidth = lastItem.outerWidth(true)

        if @settings.automargin
          lastItem.prependTo(@mainList)
        else
          @sliderWrapper.find('.to_remove').remove()
          itemClone = lastItem.clone(true)
          itemClone.prependTo(@mainList)
          lastItem.addClass('to_remove')
        
        @mainList.stop(true, true).css('left', "-#{itemFullWidth}px")
        @mainList.animate({'left': "0"}, @settings.speed, @settings.easing, 
          =>
            @sliderWrapper.find('.to_remove').remove()
            @settings.afterMove()
            @settings.afterRight()
        )

    slider = new IdeyaboxSlider(@, settings)
    slider.init()