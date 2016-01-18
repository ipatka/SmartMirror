$(document).ready(function(){

  checkLights(); //Get the initial weather.
  setInterval(checkLights, 2000); //Update the weather every 10 minutes.


});


function checkLights() {
	$.post("/Controller/LIFX.php",{lights : "all"}).done(function(data) {
		data = $.parseJSON(data);
		var status = data[0].power;
		$("#lifx_text").text(status);
	});
}