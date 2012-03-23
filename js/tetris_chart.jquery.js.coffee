$ = jQuery

$.fn.tetrisChartCoffee = (options) ->
  
  defaults = 
      xOff: 15
      yOff: 25
      chartWidth: 400
      chartHeight: 300
      tetrisBlockSize: 15
      strokeWidth: 1
      strokeColor: 'white'
      text_off_weight: 25
      series:
        data1:
          percent: 18
          above_text: '18%'
          below_text: 'Low'
          color: "gray"
        data2:
          percent: 30
          above_text: '30%'
          below_text: 'Middle'
          color: "orange"
        data3:
          percent: 52
          above_text: '18%'
          below_text: 'High'
          color: "red"
  
  options = $.extend(defaults, options)
    
  @each ->
    renderer = new Highcharts.Renderer(this, options.chartWidth, options.chartHeight) 
    buildGrid(renderer, options)
    displayData(renderer, options)
    
    
###############################################################
displayData = (renderer, options) ->
  off_x = options.xOff
  off_y = options.yOff
  data1_off = options.series.data1.percent*options.tetrisBlockSize*options.text_off_weight/100
  data2_off = (options.series.data1.percent+options.series.data2.percent)*options.tetrisBlockSize*options.text_off_weight/100
  data3_off = options.tetrisBlockSize*options.text_off_weight
  
  renderer.text(options.series.data1.above_text, (off_x), (off_y - 10)).attr(zIndex: 5).add()
  # renderer.image('/assets/arrow_down.png', (off_x + 3*p1/2 + 3), (off_y-8), 16, 16).attr(zIndex: 7).add()
  renderer.text(options.series.data1.below_text, off_x, (off_y + 90)).attr(zIndex: 5).add()

  renderer.text(options.series.data2.above_text, (off_x + data1_off), (off_y - 10)).attr(zIndex: 5).add()
  # renderer.image('/assets/arrow_down.png', (off_x + 3*p2 + 3), (off_y-8), 16, 16).attr(zIndex: 7).add()
  renderer.text(options.series.data2.below_text, (off_x + data1_off), (off_y + 90)).attr(zIndex: 5).add()
  
  renderer.text(options.series.data3.above_text, (off_x + data2_off), (off_y - 10)).attr(zIndex: 5).add()
  # renderer.image('/assets/arrow_down.png', (off_x + 250 + 3), (off_y-8), 16, 16).attr(zIndex: 7).add()
  renderer.text(options.series.data3.below_text, (off_x + data2_off), (off_y + 90)).attr(zIndex: 5).add()


buildGrid = (renderer, options) ->
  console.log(options)
  dim1 = options.series.data1.percent
  dim2 = options.series.data2.percent + dim1
  rows = 5
  cols = 20

  i = 0

  for j in [0...cols]
    x = (j*options.tetrisBlockSize) + options.xOff

    for k in [0...rows]
      i = i + 1

      if (i <= dim1)
        color = options.series.data1.color
      else if (i > dim1 && i <= dim2)
        color = options.series.data2.color
      else
        color = options.series.data3.color

      y = (k*options.tetrisBlockSize) + options.yOff

      drawBox(x, y, renderer, color, options)

drawBox = (x, y, renderer, filled_color, options) ->
  renderer.rect(x, y, options.tetrisBlockSize, options.tetrisBlockSize, 1).attr
      "stroke-width": options.strokeWidth
      stroke: options.strokeColor
      fill: filled_color
      zIndex: 3
    .add()


