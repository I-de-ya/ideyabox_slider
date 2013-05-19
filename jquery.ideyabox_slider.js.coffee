$ = jQuery
$.fn.extend
  ideyaboxSlider: (options) ->
    # Default settings
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
    # variables
    $mainList = @.find('ul').wrap("<div class='ideyabox_slider'>")
    $mainList.after("<div class='clear'/>")
    $sliderWrapper = $('.ideyabox_slider')
    $items = $sliderWrapper.find('li')
    $firstItem = $items.first()
    itemsAmount = $items.length
    $prev_button = $("<a href='#' class='ideyabox_prev'>prev</a>").appendTo($sliderWrapper)
    $next_button = $("<a href='#' class='ideyabox_next'>next</a>").appendTo($sliderWrapper)


    init = ->
      # click events in next and prev buttons
      $sliderWrapper.on('click', '.ideyabox_next', (e) ->
        e.preventDefault()
        navigation.toLeft() unless allVisible()
      )
      $sliderWrapper.on('click', '.ideyabox_prev', (e) ->
        e.preventDefault()
        navigation.toRight() unless allVisible()
      )

      # set margins
      loadAndResize()
      $(window).resize ->
        loadAndResize()

      $('li').find('img').load ->
        showOrHideButtons()

    loadAndResize = ->
      setItemsMargins() if settings.automargin
      showOrHideButtons()
      oneItem() if settings.oneItem

    oneItem = ->
      sliderWrapperWidth = $('.ideyabox_slider').width()
      $sliderWrapper.find('li').width(sliderWrapperWidth)

    # hide next and prev buttons if all visible
    showOrHideButtons = ->

      if allVisible()
        $prev_button.hide()
        $next_button.hide()
      else
        $prev_button.show()
        $next_button.show()    


    # count items margins
    setItemsMargins = ->
      sliderWrapperWidth = $sliderWrapper.width()
      itemWidth = $firstItem.width()

      visibleItemsAmount = Math.floor(sliderWrapperWidth/itemWidth)

      itemMargin = (sliderWrapperWidth - itemWidth*visibleItemsAmount)/(visibleItemsAmount - 1)
      if visibleItemsAmount is 1 then itemMargin = sliderWrapperWidth - itemWidth
      $items.css('margin-right', "#{itemMargin}px")

    # check if all items visible
    allVisible = ->
      sliderWrapperWidth = $sliderWrapper.width()
      $items = $sliderWrapper.find('li')
      if settings.automargin
        itemWidth = $firstItem.width()
        visibleItemsAmount = Math.floor(sliderWrapperWidth/itemWidth)
        visibleItemsAmount >= itemsAmount
      else
        itemsWidth = 0
        $items.each ->
          itemsWidth += $(@).width() + parseInt($(@).css('margin-right'))
        sliderWrapperWidth >= itemsWidth - parseInt($items.last().css('margin-right'))

    # next and prev buttons callbacks
    navigation =
      toLeft : ->
        $firstItem = $sliderWrapper.find('li').first()

        unless settings.automargin
          $('.to_remove').remove()
          clone = $firstItem.clone(true)
          clone.appendTo($mainList)
          $firstItem.addClass('to_remove') 

        itemWidth = $firstItem.width()
        itemMargin = parseInt($firstItem.css('margin-right'))

        $mainList.animate({'left': "-#{itemWidth+itemMargin}px"}, settings.speed, settings.easing, ->
          if settings.automargin
            $firstItem.appendTo($mainList)
          else
            $('.to_remove').remove()
          $mainList.stop(true, true).css('left', '0')
          settings.afterMove()
          settings.afterLeft()
        )

      toRight : ->
        $lastItem = $sliderWrapper.find('li').last()
        itemWidth = $lastItem.width()
        itemMargin = parseInt($lastItem.css('margin-right'))
        if settings.automargin
          $lastItem.prependTo($mainList)
        else
          $('.to_remove').remove()
          itemClone = $lastItem.clone(true)
          itemClone.prependTo($mainList)
          $lastItem.addClass('to_remove')
        
        $mainList.stop(true, true).css('left', "-#{itemWidth+itemMargin}px")
        $mainList.animate({'left': "0"}, settings.speed, settings.easing, 
          ->
            unless settings.automargin
              $('.to_remove').remove()
            settings.afterMove()
            settings.afterRight()
        )

    init()

      

