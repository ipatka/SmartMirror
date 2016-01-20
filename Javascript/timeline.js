$(document).ready(function() {
checkTides();
});

function checkTides() {
	$.post("/Controller/scrapers.php",{tide:'today'}).done(function(data) {
		console.log(data);
	});
}