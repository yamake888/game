var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var n = 10000;

/* DP 前計算始め */

var dp=[];
for(var i=0;i<=n;++i){
    dp.push(-1);
}
dp[0]=0;
function mex(array){
    for(var i=0;i<=3;++i){
        var tmp=array.indexOf(i);
        if(tmp==-1)return i;
    }
    return -1;
}
for(var i=1;i<=n;++i){
    var buf=[];
    buf.push(dp[i-1]);
    if(i%2==1&&i>=3)buf.push(dp[i-3]);
    if(i%2==0)buf.push(dp[i/2]);
    dp[i]=mex(buf);
}

/*
document.write(dp[n]);
for(var i=1;i<=100;++i){
    //document.write(i," = ",dp[i],"<br>");
}
*/

/* DP 前計算終わり */
/* 数字表示部分 */
ctx.font="72px serif";
var flag=false;
var last=0;
function game(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(!flag)ctx.fillText(n,0,80);
    else{
        ctx.font="18px serif";
        var res="last = ";
        res+=last;
        ctx.fillText(res,0,20);
        ctx.font="72px serif";
        ctx.fillText(n,20,80);
    }
    flag=true;
}
game();
/* 数字表示部分終わり */

/* コンピュータ計算部分 */

function cpuEvent(){
    if(n==0){
        if(!easyFlag)window.alert("勝利！！すごい！！！");
        else window.alert("勝利！（N=100にした。）");
        return;
    }
    if(n%2==1&&n>=3){
        if(dp[n-3]==0){
            n-=3;
            if(n==0){
                window.alert("君の負け！");
            }
            return;
        }
    }
    if(n%2==0){
        if(dp[n/2]==0){
            n/=2;
            if(n==0)window.alert("君の負け！");
            return;
        }
    }
    if(dp[n-1]==0||true){
        n-=1;
        if(n==0)window.alert("君の負け！");
        return;
    }
}

function divide(){
    if((n&1)&&n>0){
        window.alert("N が奇数の時は使えません。");
        return;
    }
    if(n<=0)return;
    n/=2;
    last=n;
    cpuEvent();
    game();
}

function subOne(){
    if(n<=0)return;
    n-=1;last=n;
    cpuEvent();
    game();
}

function subThree(){
    if(n%2==0&&n>0){
        window.alert("N が偶数の時は使えません。");
        return;
    }
    if(n==1){
        window.alert("N == 1 では使えません。");
        return;
    }
    if(n<=0)return;
    n-=3;last=n;
    cpuEvent();
    game();
}
var easyFlag=false;
function easyMode(){
    flag=false;
    easyFlag=true;
    last=0;
    n=100;
    game();
}
var divideBtn=document.getElementById('divide');
divideBtn.addEventListener('click',divide,false);

var subOneBtn=document.getElementById('subOne');
subOneBtn.addEventListener('click',subOne,false);

var subThreeBtn=document.getElementById('subThree');
subThreeBtn.addEventListener('click',subThree,false);

var easyBtn=document.getElementById('easy');
easyBtn.addEventListener('click',easyMode,false);
