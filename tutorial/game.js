var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;

var v = 1;
var dx = v;
var dy = -v;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    if(x + dx < ballRadius || x + dx + ballRadius > canvas.width)dx=-dx;
    if(y + dy < ballRadius || y + dy + ballRadius > canvas.height)dy=-dy;
    x+=dx;
    y+=dy;
}

function addVeloc(){
    dx*=0.9;
    dy*=0.9;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var speedDown=document.getElementById('speedDown');
speedDown.addEventListener('click',addVeloc,false);
var speedUp=document.getElementById('speedUp');
speedUp.addEventListener('click',function(){
    dx*=1.1;dy*=1.1;
},false);

function keyDownHandler(e){
    if(e.key=="Right" || e.key == "ArrowRight"){
        paddle.rightPress = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        paddle.leftPress = true;
    }
}
function keyUpHandler(e){
    if(e.key=="Right" || e.key == "ArrowRight"){
        paddle.rightPress = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        paddle.leftPress = false;
    }
}

setInterval(draw,10);
