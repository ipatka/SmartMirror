$(document).ready(function() {
checkTides();

initChart();

getWeather();

});

function checkTides() {
	$.post("/Controller/scrapers.php",{tide:'today'}).done(function(data) {
		console.log(data);
	});
}


function getWeather() {

	$.ajax({
			url: "https://api.forecast.io/forecast/"+forecastAPIKey+"/"+forecastLatLong,
			type: "get",
			dataType: "jsonp",
			success: function(response) {
				console.log(response);
			// self.weatherData = response;
			
			// self.updateCurrentWeather();
			// self.updateGreeting();
			/* self.updateupcomingWeather(); */
			},
			error: function() {
				console.log("Couldn't grab weather");
			}
		});
}

function initChart() {
	$('#weather').highcharts({
        chart: {
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
            },
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
                [Date.UTC(1970, 9, 21, 0, 30), 0],
                [Date.UTC(1970, 9, 21, 1, 30), 0.28],
                [Date.UTC(1970, 9, 21, 2, 30), 0.25],
                [Date.UTC(1970, 9, 21, 3, 0), 0.2],
                [Date.UTC(1970, 9, 21, 3, 30), 0.28]
            ]
        },{
        		yAxis:1,
            name: 'Tides',
            marker: {
                symbol: 'url(http://thumb7.shutterstock.com/display_pic_with_logo/356785/262919369/stock-vector-edd-single-flat-icon-on-white-background-vector-illustration-262919369.jpg)',
                width: 16,
                height: 16
            },
            data: [
            		[Date.UTC(1970, 9, 21, 0, 30), 0],
                [Date.UTC(1970, 9, 21, 1, 30), 0],
                [Date.UTC(1970, 9, 21, 2, 30), 0],
                [Date.UTC(1970, 9, 21, 3, 0), 0],
                [Date.UTC(1970, 9, 21, 3, 30), 0]
            ],
            lineWidth: 0
        }]
    });
}