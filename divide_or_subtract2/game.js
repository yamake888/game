var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var n = 10000;
var winFlag=false;

/* DP 前計算始め */

var dp=[];
var div=[];
for(var i=0;i<=n;++i){
    dp.push(-1);
    div.push([]);
}
dp[0]=0;
function mex(array){
    for(var i=0;i<=n;++i){
        var tmp=array.indexOf(i);
        if(tmp==-1)return i;
    }
    return -1;
}
dp[1]=1;
for(var i=2;i<=n;++i){
    var buf=[];
    buf.push(dp[i-1]);
    for(var j=i;j<=n;j+=i){
        div[j].push(i);
    }
    for(var j=0;j<div[i].length;++j){
        buf.push(dp[i][i/div[j]]);
    }
    dp[i]=mex(buf);
}

for(var i=0;i<100;++i){
    var x=Math.floor(Math.random()*1000)+9000;
    if(dp[x]!=0){
        n=x;
        break;
    }
}

/* DP 前計算終わり */
var cur=0;// 今見ている数の何番目の約数か？
/* 数字表示部分 */
ctx.font="72px serif";
var flag=false;
var last=n;
function game(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font="18px serif";
    var res="last = ";
    res+=last;
    ctx.fillText(res,0,20);
    ctx.font="72px serif";
    ctx.fillText(n,20,80);
    flag=true;
    if(n==0&&!winFlag){
        window.alert('君の負け！');
        return;
    }
    else{
        if(div[n].length==0)return;
        ctx.font="18px serif";
        var guideString='を';
        guideString+=div[n][cur];
        guideString+='で割る。';
        ctx.fillText(guideString,250,80);
        ctx.font="72px serif";
    }
}
game();
/* 数字表示部分終わり */

/* コンピュータ計算部分 */

function cpuEvent(){
    if(n==0){
        window.alert("勝利！！すごい！！！");
        winFlag=true;
        return;
    }
    if(dp[n-1]==0){
        n-=1;
        return;
    }
    for(var i=0;i<div[n].length;++i){
        if(dp[n/i]==0){
            n/=div[n][i];
            return;
        }
    }
    if(Math.random<=0.5){
        n-=1;
        return;
    }
    var r=Math.floor(Math.random()*div[n].length);
    n/=div[n][r];
    return;
}

function updateDivideNumber(){
    if(n==0)return;
    cur+=1;
    cur%=div[n].length;
    game();
}
function divisionExecute(){
    if(n==0)return;
    n/=div[n][cur];
    cur=0;
    cpuEvent();
    game();
}
function subOne(){
    if(n<=0)return;
    n-=1;last=n;
    cpuEvent();
    game();
}

var divideBtn=document.getElementById('divide');
divideBtn.addEventListener('click',updateDivideNumber,false);

var exeBtn=document.getElementById('execute');
exeBtn.addEventListener('click',divisionExecute,false);

var subOneBtn=document.getElementById('subOne');
subOneBtn.addEventListener('click',subOne,false);
