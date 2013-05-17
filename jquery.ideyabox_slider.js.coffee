$ = jQuery
$.fn.extend
  ideyaboxSlider: (options) ->
    # Default settings
    settings =
      speed: 'normal'
      easing: 'linear'
      itemWidth: ''

    settings = $.extend settings, options    

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
      $(window).resize ->
        setItemsWidth()
        setItemsMargins()
        showOrHideButtons()
      setItemsWidth()
      setItemsMargins()
      showOrHideButtons()

    # hide next and prev buttons if all visible
    showOrHideButtons = ->
      if allVisible()
        $prev_button.hide()
        $next_button.hide()
      else
        $prev_button.show()
        $next_button.show()    

    # set items fix width in percents
    setItemsWidth = ->
      if settings.itemWidth isnt ''
        sliderWrapperWidth = $sliderWrapper.width()
        $items.width(settings.itemWidth/100*sliderWrapperWidth)

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
      itemWidth = $firstItem.width()
      visibleItemsAmount = Math.floor(sliderWrapperWidth/itemWidth)
      visibleItemsAmount >= itemsAmount

    # next and prev buttons callbacks
    navigation =
      toLeft : ->
        $firstItem = $sliderWrapper.find('li').first()
        itemWidth = $firstItem.width()
        itemMargin = parseInt($firstItem.css('margin-right'))

        $mainList.animate({'left': "-#{itemWidth+itemMargin}px"}, settings.speed, settings.easing, ->
          $firstItem.appendTo($mainList)
          $mainList.stop(true, true).css('left', '0')
        )
      toRight : ->
        $lastItem = $sliderWrapper.find('li').last()
        itemWidth = $lastItem.width()
        itemMargin = parseInt($lastItem.css('margin-right'))

        $lastItem.prependTo($mainList)
        $mainList.stop(true, true).css('left', "-#{itemWidth+itemMargin}px")
        $mainList.animate({'left': "0"}, settings.speed, settings.easing)

    init()

      

