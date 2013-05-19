# Ideyabox

## IdeyaBox Slider
## Installation

You need to install CoffeeScript and SASS to use this plugin. If you want to write this using native JavaSript I'll be happy.
## Usage

### Responsive slider. 
Margins are calculated automatically, but you must set width of items. They should be equal each other.
    $(selector).ideyaboxSlider
      easing: 'easeOutCirc'
      speed: 'slow'
      automargin: true

### Non-responsive slider.
    $(selector2).ideyaboxSlider
      easing: 'easeInOutQuad'
      speed: 'normal'
      automargin: false

### One item on page with 3 callbacks.
    $(selector3).ideyaboxSlider
      easing: 'easeOutCubic'
      speed: 'slow'
      oneItem: true
      afterMove: -> moveCallback()
      afterLeft: -> nextClickCallback()
      afterRight: -> prevClickCallback()
