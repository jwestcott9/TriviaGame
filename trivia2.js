var clockRunning = false;
var clockRunningProgress = false;
var answer;
var question;
var wins = 0;
var losses = 0;
var y = 0;
var AnswersArray = [];
var dataObject = {};
var intervalId;
var intervalId2;
var time = 10;
var time2 = 20;
var isDisplayed = false;
let countDownClock = 5
let roundCount = 0;

$(document).ready(function(){
    $(".progress").hide();
    $("#scoreboard").hide();
    var time = 10; 
    var time2 = 20;
    var increment = "width:" +time2 +"%";
    $("#trivia").hide();
    $(".panel-default").hide();
    $(".answer").hide();
    $(".timer").hide();
    apiCall();
    
})

const start = (index) => {
    roundCount++;
    isDisplayed = true;
    printTheQuestions(dataObject, index);


    intervalId;
    intervalId2;

    if(!clockRunning){
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }

    function count() {
        if(!clockRunningProgress){
            intervalId2 =setInterval(countProgress, 100);
            clockRunningProgress = true;
        }

        function countProgress(){
            if(time2>= 108){
                let check = "time's up";
                time2 = 0; 
                clear = "Width:" + time2 + "%";
                progressBar(clear);
                clearInterval(intervalId2);
                
                $(".panel-body").hide();
                $(".card").show();
                $("#trivia").hide();

                loss(check);
            }
            else {
                time2++;
                increment = "width:" +time2 +"%";
                progressBar(increment);
                console.log(time2)
            }
        }
    }
}

const progressBar = (x) => {
    $('#display').attr('style', x)
}

const printTheQuestions = (dataObject, index) =>{
    console.log(dataObject);
   
    question = dataObject.results[index].question;
    answer = dataObject.results[index].correct_answer;
    let triviaDiv = $("<div>");
    triviaDiv.addClass("emptyMe");
    let Q = $("<div>").append(question);
    Q.addClass("question");
    triviaDiv.append(Q);

    for (i = 0; i < dataObject.results[index].incorrect_answers.length; i++) {
        var incorrect = dataObject.results[index].incorrect_answers[i];
        AnswersArray.push(incorrect);
      }
    AnswersArray.push(answer);
   
    for (j = 0; j < AnswersArray.length; j++) {
        var i = Math.floor(Math.random() * AnswersArray.length);
        var x = $("<div>").text(AnswersArray[i]);
        x.addClass("panel-body click1");
        triviaDiv.append(x);
        AnswersArray.splice(i, 1);
        j--;
      }
      $("#trivia").prepend(triviaDiv);
      displayTrivia();
    }


const displayTrivia = (x) => {
    $("#trivia").show();
    $(".page-header").hide();
    $("#startButton").hide();
    $("#scoreboard").show();
    $(".progress").show();
    $(".card").hide();
}

const win = (answer) =>{
    console.log("YOU WON!")
    winScreenCounter();
    // counter();
    $(".answerTitle").text("Correct!! the answer was " + answer)
    wins++;
    $("#wins").text("wins: " + wins);
    k = 1;
}

const loss = (check) => {
    console.log("YOU LOST!")
    winScreenCounter();
    // counter();
    clear = "width:" + 0 + "%";
    progressBar(clear);
    $("#trivia").hide();
    $(".panel-body").hide();
    $(".card").show();
    console.log(check);
    if(check === "wrong answer"){
    $(".answerTitle").text("WRONG!!!!! the answer was " + answer)
    losses++;
    $("#losses").text("losses:" + losses);}
    else {
        $(".answerTitle").text("Times up! the answer was " + answer)
        losses++;
        $("#losses").text("losses:" + losses);
    }
}


// const counter = () =>{
//     let countDown = 5
//     setInterval(doIt, 1000);
//     function doIt(){
//         countDown--;
//     }
//     while (countDown >= 0){ 
//     $("#timer").text(countDown);
  
// }

// }

const winScreenCounter = () =>{
        isDisplayed = false;
        $("#timer").text("6");
      /*y here represents the index of the question
     and answers in the api response data body */
     y++;
   
     restart()
     let countDownClock = 5

     let countDown = setInterval(function(){
        $("#timer").text(countDownClock)
        countDownClock--;
        if(countDownClock === 0){
           
            clearInterval(countDown);
           
        }
     }, 1000)
   
     
     timeoutId = setTimeout(function () {
        if(!isDisplayed){
        start(y);
        }
        console.log("display");
      }, 1000 * 6);
    
}

const restart = (wins, losses) =>{
    countDownClock = 5;
    clearInterval(intervalId);
    clearInterval(intervalId2);
    $(".emptyMe").empty();
    clockRunning = false;
    clockRunningProgress = false;
    time2 = 20;
    increment = "width:" + time2 + "%";
}


$(document).on("click", "#startButton", function(){ 
    $(".description").addClass("hide");  
    start(y); 
});

$(document).on("click", ".click1", function(){
    var k = 0;
    clear = "width:" + 0 + "%";
    progressBar(clear);
    $("#trivia").hide();
    $(".panel-body").hide();
    $(".card").show();

  
    /* temporarily store the answer in a variable to check against the 
    stored answer variable */
    let str = $(this).text();

    if(str === answer){
        win(str);
    }
    else{
        let check = "wrong answer"
        loss(check);
    }


    
})

$(document).on("click", "#restart", function(){
    /* I think whats happening is that the original code is not waiting on the 
    ajax call to reset the trivia logic */
    restart(wins, losses);
    start(y);
})





/* THIS IS AN ASYNC FUNCTION AND SHOULD ONLY BE CALLED 
AT THE BEGININNING OF THE GAME 
    | | | |  | | | | 
    V V V V  V V V V 
    
*/
const apiCall = () => {
    var queryURL = "https://opentdb.com/api.php?amount=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

        dataObject = response;
        $("#startButton").removeClass("hide");
       
    })
}

/* * * * * * * * * * * * * * * * * * 
 THIS SHOULD BE THE VERY BOTTOM OF THE DOCUMENT
 * * * * * * * * * * * * * * * * * * 
  */

