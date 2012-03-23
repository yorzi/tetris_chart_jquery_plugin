var $, buildGrid, displayData, drawBox;

$ = jQuery;

$.fn.tetrisChart = function(options) {
  var defaults;
  defaults = {
    xOff: 15,
    yOff: 25,
    chartWidth: 400,
    chartHeight: 300,
    tetrisBlockSize: 15,
    strokeWidth: 1,
    strokeColor: 'white',
    text_off_weight: 25,
    series: {
      data1: {
        percent: 18,
        above_text: '18%',
        below_text: 'Low',
        color: "gray"
      },
      data2: {
        percent: 30,
        above_text: '30%',
        below_text: 'Middle',
        color: "orange"
      },
      data3: {
        percent: 52,
        above_text: '18%',
        below_text: 'High',
        color: "red"
      }
    }
  };
  options = $.extend(defaults, options);
  return this.each(function() {
    var renderer;
    renderer = new Highcharts.Renderer(this, options.chartWidth, options.chartHeight);
    buildGrid(renderer, options);
    return displayData(renderer, options);
  });
};

displayData = function(renderer, options) {
  var data1_off, data2_off, data3_off, off_x, off_y;
  off_x = options.xOff;
  off_y = options.yOff;
  data1_off = options.series.data1.percent * options.tetrisBlockSize * options.text_off_weight / 100;
  data2_off = (options.series.data1.percent + options.series.data2.percent) * options.tetrisBlockSize * options.text_off_weight / 100;
  data3_off = options.tetrisBlockSize * options.text_off_weight;
  renderer.text(options.series.data1.above_text, off_x, off_y - 10).attr({
    zIndex: 5
  }).add();
  renderer.text(options.series.data1.below_text, off_x, off_y + 90).attr({
    zIndex: 5
  }).add();
  renderer.text(options.series.data2.above_text, off_x + data1_off, off_y - 10).attr({
    zIndex: 5
  }).add();
  renderer.text(options.series.data2.below_text, off_x + data1_off, off_y + 90).attr({
    zIndex: 5
  }).add();
  renderer.text(options.series.data3.above_text, off_x + data2_off, off_y - 10).attr({
    zIndex: 5
  }).add();
  return renderer.text(options.series.data3.below_text, off_x + data2_off, off_y + 90).attr({
    zIndex: 5
  }).add();
};

buildGrid = function(renderer, options) {
  var color, cols, dim1, dim2, i, j, k, rows, x, y, _results;
  console.log(options);
  dim1 = options.series.data1.percent;
  dim2 = options.series.data2.percent + dim1;
  rows = 5;
  cols = 20;
  i = 0;
  _results = [];
  for (j = 0; 0 <= cols ? j < cols : j > cols; 0 <= cols ? j++ : j--) {
    x = (j * options.tetrisBlockSize) + options.xOff;
    _results.push((function() {
      var _results2;
      _results2 = [];
      for (k = 0; 0 <= rows ? k < rows : k > rows; 0 <= rows ? k++ : k--) {
        i = i + 1;
        if (i <= dim1) {
          color = options.series.data1.color;
        } else if (i > dim1 && i <= dim2) {
          color = options.series.data2.color;
        } else {
          color = options.series.data3.color;
        }
        y = (k * options.tetrisBlockSize) + options.yOff;
        _results2.push(drawBox(x, y, renderer, color, options));
      }
      return _results2;
    })());
  }
  return _results;
};

drawBox = function(x, y, renderer, filled_color, options) {
  return renderer.rect(x, y, options.tetrisBlockSize, options.tetrisBlockSize, 1).attr({
    "stroke-width": options.strokeWidth,
    stroke: options.strokeColor,
    fill: filled_color,
    zIndex: 3
  }).add();
};
