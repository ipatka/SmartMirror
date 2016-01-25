$(document).ready(function() {

// $("#weather").kinetic();

checkTides();

var chart = initChart();

WeatherToTimeline(chart);

});

function checkTides() {
	$.post("/Controller/scrapers.php",{tide:'today'}).done(function(data) {
		console.log(data);
	});
}


function WeatherToTimeline(chart) {

	$.ajax({
			url: "https://api.forecast.io/forecast/"+forecastAPIKey+"/"+forecastLatLong,
			type: "get",
			dataType: "jsonp",
			success: function(response) {
				updateTimeline(chart, response);
				console.log(response);
			
			},
			error: function() {
				console.log("Couldn't grab weather");
			}
		});
}

function updateTimeline(chart, weather) {
	// console.log(weather);
	var temp = Math.round(weather.currently.temperature);
	var icon = weather.currently.icon;
	var currentprecip = weather.currently.precipIntensity;
	var nexthour = weather.minutely.summary;
	var nexthourshort = nexthour.replace("starting ","");
	var mintilrain = nexthour.replace(/[^0-9]/g,'');
	var hourlyweather = getHourlyWeatherData(weather);
	setTimeline(chart, hourlyweather);
}

function getHourlyWeatherData(weather) {
	upcomingWeather = [];
	// console.log(Date.UTC(2016, 0, 21, 0, 30));
	for (i = 0; i < 24; i+=2) {


		console.log(weather.hourly.data[i].time*1000); // need the *1000
		
		var date = weather.hourly.data[i].time*1000;
		// var date = new Date(weather.hourly.data[i].time*1000);
		// console.log(date);
		
		/* TEMP */

		var hourTemp = Math.round(weather.hourly.data[i].temperature);

		/* SYMBOL */

		var hourSymbol = weather.hourly.data[i].icon;

		/* RAIN SYMBOL CHECK */
		
		if (hourSymbol == "rain") {
			var rainIntensity = weather.hourly.data[i].precipIntensity;
			// console.log(rainIntensity);
			switch (true) {
				case (rainIntensity <= 0.015): // drizzle 0.002
					hourSymbol += "-drizzle";
					break;
				case (rainIntensity > 0.015 || rainIntensity <= 0.08): // light 0.017
					hourSymbol += "-light";
					break;
				case (rainIntensity > 0.08 || rainIntensity <= 0.3): // med 0.1
					hourSymbol += "-med";
					break;
				case (rainIntensity > 0.3): // heavy 0.4
					hourSymbol += "-heavy";
					break;
			};
		}

		/* TEMP FONT COLOR SET */

		var hourFontColor;

		switch (hourSymbol) {
			case("snow"):
			case("rain-drizzle"):
			case("rain-light"):
			case("rain-med"):
			case("rain-heavy"):
				hourFontColor = "#0071ba";
				break
			case("clear-night"):
			case("cloudy"):
			case("partly-cloudy-night"):
				hourFontColor = "#808080";
				break
			case("fog"):
			case("wind"):
				hourFontColor = "#ab44f8";
				break
			case("clear-day"):
			case("partly-cloudy-day"):
				hourFontColor = "#ffc600";
				break
		}

		// var formattedWeather = $.parseJSON('{ "y" : '+hourTemp+', "marker": { "symbol": "url(images/icons/'+hourSymbol+'.png)", "width": 45, "height": 45 }, "dataLabels": { "color": "'+hourFontColor+'" } }');
		var formattedWeather = hourTemp;


		dataPoint = [
			date,
			hourTemp
		];

		// var formattedDataPoint = "";
		var formattedDataPoint = $.parseJSON('{ "x" : '+date+', "y" : '+hourTemp+', "marker": { "symbol": "url(images/icons/'+hourSymbol+'.png)", "width": 45, "height": 45 }, "dataLabels": { "color": "'+hourFontColor+'" } }');
		// Push into array
		
		upcomingWeather.push(formattedDataPoint);

	}
	// console.log(upcomingWeather);
	return upcomingWeather;

}

function setTimeline(chart, data) {
	chart.series[0].setData(data);
}

function initChart() {
	var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'weather',
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            lineWidth: 0,
            tickWidth: 0,
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            labels: {
							style: {
								fontSize: 24,
								color: '#adadad',
							}
						},
            title: {
                text: ''
            }
        },
        yAxis: [{
            min: 0,
            gridLineWidth: 0,
            title: {
							enabled: false,
						},
						labels: {
							enabled: false,
						}
        },{
        		title: {
							enabled: false,
						},
						labels: {
							enabled: false,
						},
            min: 0,
            gridLineWidth: 0,
        }],
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        plotOptions: {
            spline: {
                lineWidth: 3,
								animation: true,
							marker: {
								radius: 5,
								lineColor: '#ffffff',
								lineWidth: 4
							},
							dataLabels: {
								enabled: true,
								useHTML: true,
								y: -10,
								x: 1,
								verticalAlign: 'bottom',
								style: {
									fontSize: '26px',
								}
							}
            }
        },

        series: [{
        		yAxis: 0,
            color: '#dfdfdf',
            dataLabels:{
            enabled: true
            }
        },{
        		yAxis:1,
            name: 'Tides',
            marker: {
                width: 16,
                height: 16
            },
            lineWidth: 0
        }]
    });
return chart;
}