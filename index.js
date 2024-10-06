var id; 
var selection;
var converted;
var currentQuestion;
var interval;
var timeLeft = 10;
var score = 0;


$(document).ready(function(){
  document.getElementById("user-input").disabled = true;
})

$(document).ready(function(){
  $('#user-input').on('keyup', function () {
      startGame(); 
      var userAnswer = Number($("#user-input").val());
      checkAnswer(userAnswer);
  });
});

function clicked(id){
    disableButton();
    document.getElementById("user-input").disabled = false;

    if (id == 'plus') {
        converted = "+";
    } else if (id == 'minus') {
      converted = "-";
    } else if (id == 'multiply' ) {
        converted = "×";
    } else if (id == 'divide') {
        converted = "÷";
    }  

  selection = converted;
  questionGenerator(selection);
  $("#equation").html(selection);
}

function questionGenerator (selection) {
  var question = {};
  var getNums = numbersGenerator(selection);
  var num1 = getNums[0];
  var num2 = getNums[1];
  
  if (selection == '+') {
    question.answer = num1 + num2;
  } else if (selection == '-') {
    question.answer = num1 - num2;
  } else if (selection == '×') {
    question.answer = num1 * num2;
  } else if (selection == '÷') {
    question.answer = num1 / num2;
  }

  question.num1 = String(num1);
  question.num2 = String(num2);
  question.equation = selection; 

  $('#num1').text(question.num1);  
  $('#num2').text(question.num2); 
  $('#equation').text(question.equation); 
  $('#hiddenAnswer').html(question.answer);  
};

function numbersGenerator (selection) {
  nums = [randomNumberGenerator(10), randomNumberGenerator(10)];

  if (selection == '-') {
    var temp;
    if (nums[0] < nums[1]) {
      temp = nums[0];
      nums[0] = nums[1];
      nums[1] = temp;
    }
  }  

  else if (selection == '÷') {
    var temp;
    if ((nums[0] % nums[1]) != 0 ) {
      temp = nums[0];
      nums[0] = nums[1] * temp;
    }
  }
   return nums;
}

function randomNumberGenerator (size) {
  return Math.ceil(Math.random() * size);
};

function checkAnswer (userInput) {
  var correctAnswer = $("#hiddenAnswer").text();

  if (userInput == correctAnswer) {
    $('#user-input').val('');
    questionGenerator(selection);
    updateTimeLeft(+1);
    updateScore(+1);
    return true;
  }  
  return false;
};


function startGame () {
  if (!interval) {
    if (timeLeft === 0) {
      updateTimeLeft(10);
      updateScore(-score);
    }
    interval = setInterval(function () {
      updateTimeLeft(-1);
      if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined;
        $("#timeout").html("Time Up! <br> Please reset to replay the game.")
        document.getElementById("user-input").disabled = true;
      }
    }, 1000);  
  }
};

function updateTimeLeft (amount) {
  timeLeft += amount;
  $('#time-left').text(timeLeft);
};

function updateScore (amount) {
  score += amount;
  $('#score').text(score);
};

function disableButton(){
  document.getElementById("plus").disabled = true;
  document.getElementById("minus").disabled = true;
  document.getElementById("multiply").disabled = true;
  document.getElementById("divide").disabled = true;
}


$(document).ready(function(){
  $("#reset").click(function(){
    location.reload();
    })
})