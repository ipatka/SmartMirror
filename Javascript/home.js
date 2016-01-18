$(document).ready(function(){


// Light
$('#toggle').click(function(){
		// alert('click');

$.post("/Controller/LIFX.php", {toggle : 'couch'}).done(function(returned) {
				console.log('toggle '+returned);
		});

	});


// Buttons
$('#traffic').click(function(){
	$(".buttons").css('display','none');
	$("#map").css('display','block');
	$(".right_upper").animate({
		height: '-=150px'
	},
	{ duration: 1000, queue: false });
	$(".right_lower").animate({
		height: '+=150px'
	},
	{ duration: 1000, queue: false });
	initMap();

});

$(".right_upper").click(function(){
	$(".buttons").css('display','block');
	$("#map").css('display','none');
	$(".right_upper").animate({
		height: '+=150px'
	},
	{ duration: 1000, queue: false });
	$(".right_lower").animate({
		height: '-=150px'
	},
	{ duration: 1000, queue: false });
	// $(".right_upper").css('height','390px');
	// $(".right_lower").css('height','210px');
	initMap();
});


});




//1st 21st 31st
//2nd 22nd
//3rd 23rd
//4th 5th 6th 7th 8th 9th 10th 11th 12th 13th 14th 15th 16th 17th 18th 19th 20th
//...24th 25th 26th 27th 28th 29th 30th
