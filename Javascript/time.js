$(document).ready(function(){

startTime();



function startTime() {
    var today=new Date();

    //Date
    var date = today.getDate();
    var day = today.getDay();

    day = checkDay(day);
    date = date+checkDate();

	$('#date').text(day+" the "+date);


	//Time
    var h=today.getHours();
    var m=today.getMinutes();

    m = checkTime(m);

    $('#time').text(h+":"+m);
    
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function checkDay(day) {

switch (day) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
}

return day;

}

function checkDate(date) {

var suffix;

switch (date) {
    case 1:
    case 21:
    case 31:
        suffix = "st";
        break;

    case 2:
    case 22:
        suffix = "nd";
        break;

    case 3:
    case 33:
        suffix = "rd";
        break;

    default:
        suffix = "th";
        break;

}

return suffix;

}

});

//1st 21st 31st
//2nd 22nd
//3rd 23rd
//4th 5th 6th 7th 8th 9th 10th 11th 12th 13th 14th 15th 16th 17th 18th 19th 20th
//...24th 25th 26th 27th 28th 29th 30th
