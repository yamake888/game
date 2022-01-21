var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;

var v = 2;
var dx = v;
var dy = -v;
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
    if(x<=r)dx=v;
    else if(x+r>=canvas.width)dx=-v;
    if(y<=r)dy=v;
    else if(y+r>=canvas.height)dy=-v;
}
setInterval(draw,10);
