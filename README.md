### Chart for Percentage!

=====================================================

This plugin is based on **jQuery** and **HighCharts**. Make sure you include them in your web page before you draw your tetris chart.

###How to use?
**step1:** add `<div id="tetris_chart"></div>` in your HTML file.

**step2:** put below code in your web page, it will render the tetris after your page loaded successfully.

    <script type="text/javascript">
      $(document).ready(function(){
        $("#tetris_chart").tetrisChart();
      })
    </script>
    
###More Configurations

Default configs are as below:

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
    }
    
You can set any of these items, then wrap up an `options` params for `tetrisChart()`, so you should do something like this: `$("#tetris_chart").tetrisChart(options);` 

Let me know if you find any problem on this plugin, enjoy it!

    
