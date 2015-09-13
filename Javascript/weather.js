$(document).ready(function() {  
  getWeather(); //Get the initial weather.
  setInterval(getWeather, 600000); //Update the weather every 10 minutes.
});

function getWeather() {
  $.simpleWeather({
    location: '92104',
    unit: 'f',
    success: function(weather) {


        html = '<div>'+'<i class="icon-'+weather.code+'"></i>'+weather.temp+'&deg;'+weather.units.temp+'</div>';
        html += '<div>'+weather.currently+'</div>';

        html += '<div>'+weather.high+'&deg;'+'/'+weather.low+'&deg;'+'</div>';
        html += '<div>'+weather.text+'</div>';
  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}