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
var paddleRightPress = false;
var paddleLeftPress = false;
var paddleVeloc = 7;

function getRandomString(){
    var l = 13;
    var c = "abcd";
    var cl = c.length;
    var res="a";
    for(var i = 0;i < l;++i){
        res+=c[Math.floor(Math.random()*cl)];
    }
    res+="b";
    return res;
}

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

function drawCharactor(){
    ctx.font="48px serif";
    ctx.fillText("Hellow world!",10,50);
}

function addVeloc(){
    dx*=0.9;
    dy*=0.9;
    paddleVeloc*=0.9;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var speedDown=document.getElementById('speedDown');
speedDown.addEventListener('click',addVeloc,false);
var speedUp=document.getElementById('speedUp');
speedUp.addEventListener('click',function(){
    dx*=1.1;dy*=1.1;paddleVeloc*=1.1;
},false);

function keyDownHandler(e){
    if(e.key=="Right" || e.key == "ArrowRight"){
        paddleRightPress = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        paddleLeftPress = true;
    }
}
function keyUpHandler(e){
    if(e.key=="Right" || e.key == "ArrowRight"){
        paddleRightPress = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        paddleLeftPress = false;
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    ctx.fillText("✌ < チョキ",30,100);
    var paddleCollisionFlag = y+dy+ballRadius>=canvas.height-paddleHeight && (x+dx>=paddleX && x+dx<=paddleX+paddleWidth);
    if(x + dx < ballRadius || x + dx + ballRadius > canvas.width)dx=-dx;
    if(y + dy < ballRadius || y + dy + ballRadius > canvas.height || paddleCollisionFlag)dy=-dy;
    x+=dx;
    y+=dy;
    if(paddleRightPress && paddleX+paddleWidth+paddleVeloc<=canvas.width)paddleX+=paddleVeloc;
    if(paddleLeftPress && paddleX-paddleVeloc>=0)paddleX-=paddleVeloc;
}

var cur = getRandomString();

function init(){
    cur = getRandomString();
    ctx.font="72px serif";
}

function rockClick(){window.alert("勝利！");}
function scissorsClick(){window.alert("じゃんけん三原則:\n\t同じ手は引き分ける。");}
function paperClick(){window.alert("じゃんけん三原則:\n\tパーはチョキに勝てない。")}

var rock=document.getElementById('rock');
rock.addEventListener('click',rockClick,false);
var scissors=document.getElementById('scissors');
scissors.addEventListener('click',scissorsClick,false);
var paper=document.getElementById('paper');
paper.addEventListener('click',paperClick,false);

function game(){
    init();
    setInterval(draw,10);
}

game();

