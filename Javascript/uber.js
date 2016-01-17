$(document).ready(function(){

// $('#toggle').click(function(){
		// alert('click');

var uber_token = 'wLT4d9aIoSdRyctnbTQ9hW574lgs3HplAZxyLzR2';



	$.ajax({
		url: "https://api.uber.com/v1/estimates/time",
		headers: {
			Authorization: "Token " + uber_token
		},
		data: { 
			start_latitude: '32.7315206',
			start_longitude: '-117.1299825'
		},
		success: function(result) {
			// console.log(JSON.stringify(result));
			uberTime = Math.round(result.times[0].estimate/60);
			// console.log(uberTime);
			$("#uber").text("Closest Uber: "+ uberTime + " min");
		}
		});

	// });


});

