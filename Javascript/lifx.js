$(document).ready(function(){

  checkLights(); //Get the initial weather.
  setInterval(checkLights, 1000); //Update the weather every 10 minutes.


});


function checkLights() {
	$.post("/Controller/LIFX.php",{lights : "all"}).done(function(data) {
		data = $.parseJSON(data);
		// console.log(data);
		var status = data[0].power;
		var hue = Math.round(data[0].color.hue);
		var saturation = Math.round(data[0].color.saturation * 100);
		var brightness = Math.round(data[0].brightness * 100);
		// console.log(hue+' '+saturation+' '+brightness);

		$("#lifx_text").text(status);
		// $('.screen_left').css('background-color','hsl('+hue+','+saturation+','+brightness+')';
		
		$('#lifx_text').css('background-color','hsl('+hue+','+saturation+'%,'+brightness+'%)');

	});
}

// function checkLights() {
// 	$.post("/Controller/LIFX.php",{lights : "all"}).done(function(data) {
// 		data = $.parseJSON(data);
// 		var status = data[0].power;
// 		// var hue = data[0].color.hue;
// 		// var saturation = data[0].color.saturation;
// 		// saturation = saturation * 100;
// 		// var brightness = data[0].brightness;
// 		// brightness = brightness * 100;
// 		console.log(data);
// 		$("#lifx_text").text(status);
// 		// if (status == 'on') {
// 		// 	$('#lifx_text').css('background-color','hsl('+hue+','+saturation+'%,'+brightness+'%)');
// 		// }
// 	});
// }