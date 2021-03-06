$(document).ready(function() {

$("#weather").kinetic();

// checkTides();

var chart = initChart();

getWeather(chart);

// console.log('getting tides');

getTides(chart);

setVisibilitySeries(chart, 'tides', 'FALSE');
$("#toggle_tides_weather").data("state", "weather");
// $("#weather_tide_text").text("Show Tides");


$("#toggle_tides_weather").click(function() {
	var state = $(this).data("state");
	if (state == "weather") {
		// switch to tides
		setVisibilitySeries(chart, 'weather', 'FALSE');
		setVisibilitySeries(chart, 'tides', 'TRUE');
		chart.setSize(600, 290);
		$(this).data("state", "tides");
		// $("#weather_tide_text").text("Show Weather");
		$("#weather_tide_img").attr("src","/images/weather.png");
	} else if (state == "tides") {
		setVisibilitySeries(chart, 'tides', 'FALSE');
		setVisibilitySeries(chart, 'weather', 'TRUE');
		chart.setSize(900, 290);
		$(this).data("state", "weather");
		$("#weather_tide_img").attr("src","/images/waves.png");
	}
	chart.redraw();
});

});

function checkTides() {
	$.post("/Controller/scrapers.php",{tide:'today'}).done(function(data) {
		// console.log(data);
	});
}


function getWeather(chart) {

	$.ajax({
			url: "https://api.forecast.io/forecast/"+forecastAPIKey+"/"+forecastLatLong,
			type: "get",
			dataType: "jsonp",
			success: function(response) {
				updateTimelineWeather(chart, response);
				// console.log(response);
			
			},
			error: function() {
				console.log("Couldn't grab weather");
			}
		});
}

function getTides(chart) {
	console.log('getting tides 2');
	$.post("/Controller/scrapers.php",{tide:'today'}).done(function(response) {
		response = $.parseJSON(response);
		updateTimelineTides(chart, response);
		console.log('got tides');
		console.log(response);
	}).fail(function(){
			console.log("Couldn't grab tides");
	});
}

function updateTimelineWeather(chart, weather) {
	// console.log(weather);
	var temp = Math.round(weather.currently.temperature);
	var icon = weather.currently.icon;
	var currentprecip = weather.currently.precipIntensity;
	var nexthour = weather.minutely.summary;
	var nexthourshort = nexthour.replace("starting ","");
	var mintilrain = nexthour.replace(/[^0-9]/g,'');
	var hourlyweather = getHourlyWeatherData(weather);
	setTimeline(chart, 'weather', hourlyweather);
}

function updateTimelineTides(chart, tides) {
	var hourlyTides = getHourlyTideData(tides);
	setTimeline(chart, 'tides', hourlyTides);
}

// Date.UTC(1970, 9, 21, 0, 30)

function getHourlyTideData(tides) {
	var upcomingTides = [];
	var split_string;
	var hours;
	var minutes;

	var year;
	var month;
	var day;

	var today = new Date();
	var tomorrow = new Date(+new Date() + 86400000);

	year = today.getFullYear();
	month = today.getMonth();
	day = today.getDate();
	hours = today.getHours();
	minutes = today.getMinutes();
	datetime = Date.UTC(year, month, day, hours, minutes);
	
	//seed with blank data point at now for formatting
	var datetime_adjusted = datetime + (today.getTimezoneOffset() * 60 * 1000);
	var formattedDataPointSeed = $.parseJSON('{ "x" : '+datetime_adjusted+', "y" : 0.05, "marker": { "enabled": false } }');
	upcomingTides.push(formattedDataPointSeed);


	var date;
	var tide;

	var datetime;


	$.each(tides, function(i, item) {
		split_string = item.split(":");
		hours = split_string[0];
		minutes = split_string[1];
		if (/today/i.test(i)) {
			date = today;
			if (/high/i.test(i)) {
				tide = 'high';
				// console.log('today high '+hours);
			} else if (/low/i.test(i)) {
				tide = 'low';
				// console.log('today low '+hours);
			}
		} else if (/tomorrow/i.test(i)) {
			date = tomorrow;
			if (/high/i.test(i)) {
				tide = 'high';
				// console.log('tomorrow high '+hours);
			} else if (/low/i.test(i)) {
				tide = 'low';
				// console.log('tomorrow low '+hours);
			}
		}
		// console.log(i +' '+item);
		year = date.getFullYear();
		month = date.getMonth();
		day = date.getDate();
		datetime = Date.UTC(year, month, day, hours, minutes);
		// console.log(year+','+month+','+day+','+hours+','+minutes);
		// console.log(datetime);
		// console.log(tide);

		var formattedDataPoint = $.parseJSON('{ "x" : '+datetime+', "y" : 0.05, "marker": { "symbol": "url(images/icons/tide-'+tide+'.png)", "width": 25, "height": 25 } }');

		
		// Don't include earlier than right now or more than 24 hr from now so it matches the weather timeline
		if ((datetime > today) && (datetime < tomorrow)) {
			upcomingTides.push(formattedDataPoint);
		}
		// console.log(hours+':'+minutes);
	});
	return upcomingTides;
	// console.log(tidesarray.length);

}


function getHourlyWeatherData(weather) {
	// console.log(weather);
	var upcomingWeather = [];



	// console.log(Date.UTC(2016, 0, 21, 0, 30));
	for (i = 0; i < 24; i+=2) {


		// console.log(weather.hourly.data[i].time*1000); // need the *1000
		
		var date = weather.hourly.data[i].time*1000;
		console.log(new Date(date));
		// console.log(date);
  //   	date_handle.setMinutes(0);
  //   	var date = date_handle.parse();
		
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
		var formattedDataPoint = $.parseJSON('{ "x" : '+date+', "y" : '+hourTemp+', "marker": { "symbol": "url(images/icons/'+hourSymbol+'.png)", "width": 40, "height": 40 }, "dataLabels": { "color": "'+hourFontColor+'" } }');
		// Push into array
		
		upcomingWeather.push(formattedDataPoint);

	}
	// console.log(upcomingWeather);
	return upcomingWeather;

}

function setTimeline(chart, seriestype,  data) {
	var seriesnum;
	if (seriestype == 'weather') {
		seriesnum = 0;
	} else if (seriestype == 'tides') {
		seriesnum = 1;
	}
	chart.series[seriesnum].setData(data);
	if (seriestype == 'weather') {
		var extremes = chart.yAxis[seriesnum].getExtremes();
		chart.yAxis[seriesnum].setExtremes(extremes.dataMin, extremes.dataMax*1.15);
	}
}

function setVisibilitySeries(chart, seriestype, visible) {
	var seriesnum;
	if (seriestype == 'weather') {
		seriesnum = 0;
	} else if (seriestype == 'tides') {
		seriesnum = 1;
	}

	var series = chart.series[seriesnum];

	if (visible == 'FALSE') {
		if (series.visible) {
            series.hide();
    	}
	} else if (visible == 'TRUE') {
		if (series.visible) {
			// Do nothing
		} else {
			series.show();
		}
	}
	
}



function initChart() {
	var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'weather',
            type: 'spline',
            height: 290,
            width: 900,
            spacing: [0, 0, 0, 0]
        },
        title: {
            text: '' 
        },
        subtitle: {
            enabled: false
        },
        legend: {
        	enabled: false
        },
        credits: {
        	enabled: false
        },
        exporting: {
        	enabled: false
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 2 * 3600 * 1000,
            startOnTick: true,
            endOnTick: true,
            lineWidth: 0,
            tickWidth: 0,
            // minPadding: 0.1,
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            labels: {
				style: {
					fontSize: 18,
					color: '#adadad',
						},
				formatter: function () {
					var now = new Date();
					var now_date = now.getDate();
					var now_hours = now.getHours();
                    var label = new Date(this.value);
                    var label_hours = label.getHours();
                    var label_date = label.getDate();
                    if ((now_date == label_date)&&(label_hours == now_hours)) {
                    	return 'Now';
                    } else {
            			return (label_hours > 12 ? (label_hours - 12)+'pm' : (label_hours == 0 ? 12 : label_hours)+'am');
                    }
                	}
					},
            title: {
                text: ''
            }
        },
        tooltip: {
        			enabled: false
    			},
        yAxis: [
        	{
            	min: 0,
            	minPadding: 0.15,
            	gridLineWidth: 0,
            	title: {
					enabled: false,
				},
				labels: {
					enabled: false,
				}
        	},
        	{
        		title: {
					enabled: false,
					},
				labels: {
					enabled: false,
				},
            	min: 0,
            	max: 1,
            	minPadding: 0.15,
           		gridLineWidth: 0,
        	}
        		],

        plotOptions: {
            spline: {
                lineWidth: 2,
								animation: true,
							marker: {
								radius: 5,
								lineColor: '#ffffff',
								lineWidth: 4
							},
							dataLabels: {
								useHTML: true,
								y: -12,
								x: 1,
								verticalAlign: 'bottom',
								style: {
									fontSize: '18px',
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