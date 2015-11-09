$(document).ready(function () {
	var surveyDate = GetSurveyDate();
	var surveyDay = GetDayName(surveyDate.getDay());


	var hour = new Date().getUTCHours()
	$('h3').append("How was your "+surveyDay+"?");
});

function GetSurveyDate(){
	return (new Date());
}

function GetDayName(dayOfWeek){
	return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayOfWeek];
}