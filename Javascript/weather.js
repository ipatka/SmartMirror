$(document).ready(function() {
  getWeather(); //Get the initial weather.
  setInterval(getWeather, 600000); //Update the weather every 10 minutes.
});

function getWeather() {
  $.simpleWeather({
    location: '92104',
    unit: 'f',
    success: function(weather) {

        html = '<div>Right Now</div>';
        html += '<div>'+'<i class="icon-'+weather.code+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</div>';
        

        html += '<div>Today</div><div>'+weather.high+'&deg;'+'/'+weather.low+'&deg;'+'</div>';
        html += '<div>'+weather.text+'</div>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

// $(document).ready(function() {

//     $('#weather').highcharts({
//         chart: {
//             type: 'bar'
//         },
//         title: {
//             text: 'Fruit Consumption'
//         },
//         xAxis: {
//             categories: ['Apples', 'Bananas', 'Oranges']
//         },
//         yAxis: {
//             title: {
//                 text: 'Fruit eaten'
//             }
//         },
//         series: [{
//             name: 'Jane',
//             data: [1, 0, 4]
//         }, {
//             name: 'John',
//             data: [5, 7, 3]
//         }]
//     });

// });