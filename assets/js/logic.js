var config = {
    apiKey: "AIzaSyCLf7rVAFIaytH_NwHj2uL4rJcJyucu7cM",
    authDomain: "bootcamp-example-2756a.firebaseapp.com",
    databaseURL: "https://bootcamp-example-2756a.firebaseio.com",
    projectId: "bootcamp-example-2756a",
    storageBucket: "bootcamp-example-2756a.appspot.com",
    messagingSenderId: "501819586718",
    appId: "1:501819586718:web:b2e4fca67e8fa843dd638f"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;
  var nextArrival = 0;
  var minutesAway = 0;

  $("#add-user").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#time-input").val().trim();
    frequency = $("#rate-input").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
      name: name,
      destination: destination,
      first_train_time: firstTrainTime,
      frequency: frequency
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#rate-input").val("")

  });

  function trainMaths(firstTime,freq){
    var firstTimeConverted = moment(firstTime, "HH:mm");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % freq;
    minutesAway = freq - tRemainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextTrain).format("hh:mm");
    };

  database.ref().on("child_added", function(snapshot) {
    trainMaths(snapshot.val().first_train_time,snapshot.val().frequency);
    var row = $("<tr>");
    row.append("<td>"+snapshot.val().name+"</td>");
    row.append("<td>"+snapshot.val().destination+"</td>");
    row.append("<td>"+snapshot.val().frequency+"</td>");
    row.append("<td>"+nextArrival+"</td>");
    row.append("<td>"+minutesAway+"</td>");
    $("#tableBody").append(row);

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

