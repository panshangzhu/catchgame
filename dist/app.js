var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
let time = 5000;

//set ladybird
var lbReady = false;
var lbImage = new Image();
lbImage.onload = function() {
  lbReady = true;
};
lbImage.src = "Ladybug.png";
var ladyBird = {
  x: 0,
  y: 0
};
var ladyBirdCaught = 0;
var score = document.getElementById("score");
score.innerHTML = " " + ladyBirdCaught;

//handle click
var mouse = {
  x: undefined,
  y: undefined
};

// Draw Everything
function render() {
  if (lbReady) {
    c.drawImage(lbImage, ladyBird.x, ladyBird.y, 40, 40);
  }
}
// ladybird move
var move = setInterval(ladyBirdmove, time);

function ladyBirdmove() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  var mx = Math.random() * (canvas.width - 80) + 40;
  var my = Math.random() * (canvas.height - 80) + 40;
  ladyBird.x = mx;
  ladyBird.y = my;
  c.drawImage(lbImage, ladyBird.x, ladyBird.y, 40, 40);
  // set speed
  if (time > 1000) {
    time = time - 100;
    clearInterval(move);
    move = setInterval(ladyBirdmove, time);
  } else {
    //time = time;
    clearInterval(move);
    move = setInterval(ladyBirdmove, time);
  }

  console.log(time);
}

//update games
function updateGames() {
  canvas.addEventListener("click", checkPosition, false);

  function checkPosition(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    if (
      Math.abs(mouse.x - (window.innerWidth - canvas.width) / 2 - ladyBird.x) <
        30 &&
      Math.abs(mouse.y - ladyBird.y - canvas.offsetTop) < 30
    ) {
      ladyBirdCaught = ladyBirdCaught + 1;
      score.innerHTML = ladyBirdCaught;
      clearInterval(move);
      ladyBirdmove();
    }
  }
}
// reset game
function resetGame() {
  ladyBirdCaught = 0;
  score.innerHTML = ladyBirdCaught;
  resetSpeed();
}
//reset speed
function resetSpeed() {
  time = 5000;
  updateGames();
}

//play games

function functions() {
  render();
  updateGames();
  document.getElementById("speed").addEventListener("click", resetSpeed, false);
  document
    .getElementById("restart")
    .addEventListener("click", resetGame, false);
}

window.addEventListener("load", functions, false);
