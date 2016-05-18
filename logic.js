 //Link to Firebase
 var transportationInfo = new Firebase("https://trainschedulemm.firebaseio.com/");
//linking adding of new train to table

$("#SubmitButton").on("click", function(){

	//putting info into new variables
	var Name = $("#train-name-input").val().trim();
	var Destination = $("#destination-input").val().trim();
	var Time = $("#train-time-input").val().trim();
	var Frequency = $("#frequency-input").val().trim();

	//store information on the database
	transportationInfo.push({
		name: Name,
		destiation: Destination,
		Time: Time,
		Frequency: Frequency
	})

	//Console.log to test
	console.log(TrainName);


	return false;


});

transportationInfo.on("child_added", function(childSnapshot){

	console.log(childSnapshot.val().Name);
	console.log(childSnapshot.val().Destinaiton);
	console.log(childSnapshot.val().Time);
	console.log(childSnapshot.val().Frequency);

//have to create vaiables to store everything got time conversion below
	var Name = childSnapshot.val().name;
	var Destination = childSnapshot.val().destination;
	var Time = childSnapshot.val().time;
	var Frequency = childSnapshot.val().frequency;	
});

//Convert Time
//1st time converted  (pushed back 1 yeat to make sure it comes bck before current time)
var trainTimeConverted= moment(Time, "HH:mm").subtract(1, "years")
	console.log(trainTimeConverted);

//Current Time
var currentTime= moment();
	console.log("CURRENT TIME" + moment(currentTime).format("hh:mm"));

//Difference Between the Times
var diffTime= moment().diff(moment(trainTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME:" +  diffTime);

//Time Apart (remainder)
var tRemiander= diffTime % Frequency;
	console.log(tRemiander); 

//Minutes Until Train
var tMinutesUntilTrain = Frequency - tRemiander;
	console.log("Minutes TILL TRAIN" + tMinutesUntilTrain);

//Next Train
var nextTrain= moment().add(tMinutesUntilTrain, "minutes");
	console.log("ARRIVAL TIME" + moment(nextTrain).format("hh:mm"))


