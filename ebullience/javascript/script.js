$(document).ready(function () {
	var today = GetDayName((new Date()).getDay());


	var hour = new Date().getUTCHours()
	$('h3').append("How was your "+today+"?");
});

function GetDayName(dayOfWeek){
	return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayOfWeek];
}