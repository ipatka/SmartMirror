$(document).ready(function(){

$('#toggle').click(function(){
		// alert('click');

$.post("/Controller/LIFX.php", {toggle : 'couch'} ,function() {
				// alert('toggle');
		});

	});


});

//1st 21st 31st
//2nd 22nd
//3rd 23rd
//4th 5th 6th 7th 8th 9th 10th 11th 12th 13th 14th 15th 16th 17th 18th 19th 20th
//...24th 25th 26th 27th 28th 29th 30th
