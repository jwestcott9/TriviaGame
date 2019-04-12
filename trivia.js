// contains the button clicks
$(document).ready(function () {
  $(".progress").hide();
  $("#scoreboard").hide();
  var time = 10;
  clockRunning = false;
  clockRunningProgress = false;
  var time2 = 20;
  var increment = "width:" + time2 + "%";
  var answer;
  var y = 0;
  var intervalId;
  var intervalId2;
  var AnswersArray = [];
  wins = 0;
  losses = 0;
  var clear;

  function progressBar(x) {
    $("#display").attr(
      "style", x)
  }
$(document).on("click", "#startButton", function () {
    $(".page-header").hide();
    $("#startButton").hide();
    $("#scoreboard").show();
    displayTrivia();
    $(".progress").show();

  })
  $(document).on("click", "#restart", function () {
    clearInterval(intervalId);
    clearInterval(intervalId2);
    clearInterval(timeoutId);
    clockRunning = false;
    clockRunningProgress = false;
    time2 = 20;
    increment = "width:" + time2 + "%";
    answer = "";
    AnswersArray = [];
   
    displayTrivia();
    console.log("workdone");
  })
  $("#trivia").hide();
  $(".panel-default").hide();
  $(".answer").hide();

  
 
  // this happens after the button is clicked 
  function displayTrivia() {
    $(".card").hide();
    var queryURL = "https://opentdb.com/api.php?amount=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $(document).on("click", ".click1", function () {
        var k = 0;
        clear = "width:" + 0 + "%";
        progressBar(clear);
        $("#trivia").hide();
        $(".panel-body").hide();
        $(".card").show();
        
        y++;
        var str = $(this).text();
        console.log(str);
        console.log(answer)
        if (str === answer) {

          $(".card-title").text("Correct!! the answer was " + answer)
          wins++;
          $("#wins").text("wins: " + wins);
          k = 1;


        } else {
          $(".card-title").text("WRONG!!!!! the answer was " + answer)
          
        }
        reset();
        console.log
        progressBar(clear);
        if (k===0){
          losses++;
          $("#losses").text("losses: " + losses);
        }
      })


      $("#trivia").show();
      start();

      $(".emptyMe").empty();
      triviaDiv = $("<div>");
      triviaDiv.addClass("emptyMe")
      var question = response.results[y].question
      var Q = $("<div>").append(question);
      triviaDiv.append(Q);


      // this needs to just add to an array 

      for (i = 0; i < response.results[y].incorrect_answers.length; i++) {
        var incorrect = response.results[y].incorrect_answers[i];
        AnswersArray.push(incorrect);
      }


      var answer = response.results[y].correct_answer;
      AnswersArray.push(answer);

      // correct.addClass("panel-body correct")
      // triviaDiv.append(correct);
      $("#trivia").prepend(triviaDiv);
      for (j = 0; j < AnswersArray.length; j++) {
        var i = Math.floor(Math.random() * AnswersArray.length);
        var x = $("<div>").text(AnswersArray[i]);
        x.addClass("panel-body click1");
        triviaDiv.append(x);
        AnswersArray.splice(i, 1);
        j--;
      }

      function start() {
        intervalId;
        intervalId2;
    
        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
          intervalId = setInterval(count, 1000);
          clockRunning = true;
        }
    
        //  HERE is the progress bar statement
    
    
        function count() {
    
          if (!clockRunningProgress) {
            intervalId2 = setInterval(countProgress, 100);
            clockRunningProgress = true;
          }
    
          function countProgress() {
    
            if (time2 >= 108) {
              time2 = 0;
              clear = "Width:" + time2 + "%";
              progressBar(clear);
              clearInterval(intervalId2);
              $(".panel-body").hide();
              $(".card").show();
              reset();
              y++;
              console.log("stop");
              $(".card-title").text("Time's up... the answer was " + answer)
              losses++;
              $("#losses").text("losses: " + losses);
              $("#trivia").hide();
    
            } else {
              time2++
              increment = "width:" + time2 + "%"
              progressBar(increment);
              console.log(time2);
            }
    
    
          }
        }
      }
    })


  }
// this contains the time elements. it has the logic that will time out the answer field 
  

 function reset() {
    
    

    clearInterval(intervalId);
    clearInterval(intervalId2);
    clockRunning = false;
    clockRunningProgress = false;
    time2 = 20;
    increment = "width:" + time2 + "%";
    answer = "";
    AnswersArray = [];
    timeoutId = setTimeout(function () {
      displayTrivia();

      console.log("display");
    }, 1000 * 5);

  };

})