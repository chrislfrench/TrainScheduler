

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


// initial values of table
var name = "";
var destination = "";
var frequency = 0;
var arrivalTime = 0;
var arrivalAway = 0;

// capture button click
$("#add-train").on("click", function(){

  // don't refresh the page. 
  event.preventDefault();

  var name = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = moment($("#time-input").val().trim(), "HH:mm").format("");
  var frequency = $("#frequency-input").val().trim();

  var newTrains = {
    tname: name,
    tdestination: destination,
    tFirst: firstTime,
    tfreq: frequency,
  }

  //uploads data to the database
  database.ref().set(newTrains);


  // logs everything to the console
  console.log(newTrains.tname);
  console.log(newTrains.tdestination);
  console.log(newTrains.tFirst);
  console.log(newTrains.tfreq)

  $('#trainName-input').val("");
  $('#destination-input').val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});




console.log("js page is attached");