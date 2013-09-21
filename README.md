# IdeyaBox Slider

## Installation

You need to install CoffeeScript and SASS to use this plugin. If you want to write this using native JavaSript I'll grateful to you.
## Usage

### Responsive slider. 
Margins are calculated automatically, but you must set width of items. They should be equal to each other.

    $(selector).ideyaboxSlider
      easing: 'easeOutCirc'
      speed: 'slow'
      automargin: true

### Non-responsive slider.
    $(selector2).ideyaboxSlider
      easing: 'easeInOutQuad'
      speed: 'normal'
      automargin: false

### Autoplaying slider, one item on page with 3 callbacks.
    $(selector3).ideyaboxSlider
      easing: 'easeOutCubic'
      speed: 'slow'
      oneItem: true
      play: true
      interval: 3000
      afterMove: -> moveCallback()
      afterLeft: -> nextClickCallback()
      afterRight: -> prevClickCallback()
### Html blocks as responsive slider
    $(selector4).ideyaboxSlider
      easing: 'easeOutCubic'
      # width of 'li' is required
### One html item on page responsive slider
    $(selector4).ideyaboxSlider
      easing: 'easeOutCubic'
      oneItem: true
      # width of 'li' is required
