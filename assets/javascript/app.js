

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLtMYNxLJ2D78yWCOByNvE5izfGxt93W0",
  authDomain: "enginepoodle.firebaseapp.com",
  databaseURL: "https://enginepoodle.firebaseio.com",
  storageBucket: "enginepoodle.appspot.com",
  messagingSenderId: "452612552148"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// capture button click
$("#add-train").on("click", function(){

  // don't refresh the page. 
  event.preventDefault();

  var name = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = moment($("#time-input").val().trim(), "HH:mm").format("");
  var frequency = $("#frequency-input").val().trim();


  database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,

  })

  $('#trainName-input').val("");
  $('#destination-input').val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  alert("New train added!");

});

//when a new item is added (child) do this function
database.ref().on("child_added", function(childSnapshot){


  //store everything into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  //train info
  // console.log(trainName);
  // console.log(destination);
  // console.log(firstTime);
  // console.log(frequency);

  // //convert first time (push back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
   
  // //current time
  var currentTime = moment();

  // //difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // //time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // //minute until train
  var tMinutesTillTrain = frequency - tRemainder;

  // //next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainConverted = moment(nextTrain).format("hh:mm a");
  // console.log(nextTrainConverted);

  //add each trains data into the table
  
  var row = $("<tr>");
  row.append("<td>" + childSnapshot.val().name + "</td>");
  row.append("<td>" + childSnapshot.val().destination + "</td>");
  row.append("<td>" + childSnapshot.val().frequency + "</td>");
  row.append("<td>" + nextTrainConverted + "</td>");
  row.append("<td>" + tMinutesTillTrain + "</td>");
  $("#trainTable").append(row);
});


console.log("js page is attached");