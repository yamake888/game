var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;

var dx = 2;
var dy = -2;
var r = 10;
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x+=dx;
    y+=dy;
    if(x<=r)dx=2;
    else if(x+r>=canvas.width)dx=-2;
    if(y<=r)dy=2;
    else if(y+r>=canvas.height)dy=-2;
}
setInterval(draw,10);
