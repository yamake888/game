var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var n = 10000/5;//A_iの最大値
var m=5;//A の数

var winFlag=false;
var a=[];
var cur=[];
var xorSum=0;
var pointer=0;
var dp=[];
var div=[];

/* xorSum を 取得 */
function getXorSum(){
    var res=0;
    for(var i=0;i<m;++i){
        res=res^dp[a[i]];
    }
    return res;
}
/* xorSum を 取得 */

/* 勝利判定 */
function judgeWin(){
    for(var i=0;i<m;++i)if(a[i]!=0)return false;
    return true;
}
/* 勝利判定 */
/* DP 前計算始め */
function DPinit(){
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
            buf.push(dp[i/div[i][j]]);
        }
        dp[i]=mex(buf);
    }
}
/* DP 前計算終わり */

/* 初期化 */
function init(){
    xorSum=0;
    winFlag=false;
    a=[];
    cur=[];
    pointer=0;
    for(var i=0;i<m;++i){
        var x=Math.floor(Math.random()*n);
        a.push(x);
        cur.push(0);
    }
    xorSum=getXorSum();
    if(xorSum==0){
        a[0]+=1;
        xorSum=getXorSum();
    }
    document.write(xorSum);
}
/* 初期化終わり */

/* 数字表示部分 */
ctx.font="32px serif";
var flag=false;
var last=n;
var lastString="";

function drawLittleString(printString){
    ctx.font="18px serif";
    ctx.fillText(lastString,0,50);
    var pointerString = "選択中:\t";
    pointerString+=a[pointer];
    pointerString+='\t/\t割るなら\t';
    var aVal=a[pointer];
    if(div[aVal].length>0)pointerString+=div[aVal][cur[pointer]];
    ctx.fillText(pointerString,0,150);
    lastString = "last = ";
    lastString+=printString;
    ctx.font="32px serif";
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var printString="";
    for(var i=0;i<m;++i){
        printString+=a[i];
        if(i==m-1)break;
        printString+='\t/\t';
    }
    drawLittleString(printString);
    ctx.fillText(printString,0,100);
}
/* 数字表示部分終わり */

/* コンピュータ計算部分 */
function comChoice(){
    draw();
    if(xorSum==0){
        for(var i=0;i<m;++i){
            if(a[i]>0){
                var r=Math.floor(Math.random()*(div[a[i]].length+1));
                if(r>=div[i].length){
                    a[i]-=1;
                    xorSum=xorSum^(a[i]+1)^a[i];
                }
                else{
                    xorSum=xorSum^a[i];
                    a[i]/=div[a[i]][r];
                    xorSum=xorSum^a[i];
                }
                draw();
                return;
            }
        }
    }
    /* TODO: COM の必勝手順を書く */
}
/* コンピュータ計算部分 */

function updateDivideNumber(){
    // 次の約数へ
    if(div[a[pointer]].length==0)return;
    cur[pointer]+=1;
    cur[pointer]%=div[a[pointer]].length;
    draw();
}
function divisionExecute(){
    // 割り算を実行
    var i = pointer;
    if(div[a[i]].length==0)return;
    a[i]/=div[a[i]][cur[i]];
    cur[i]=0;
    draw();
    comChoice();
}
function subOne(){
    // 1 を引く
    var i = pointer;
    if(a[i]==0)return;
    a[i]-=1;
    cur[i]=0;
    draw();
    if(judgeWin()){
        window.alert("勝利！！すごい！！！");
        return;
    }
    comChoice();
}
function changeNext(){
    // 隣の要素を選択
    cur[pointer]=0;
    pointer+=1;
    pointer%=m;
    draw();
}

var divideBtn=document.getElementById('divide');
divideBtn.addEventListener('click',updateDivideNumber,false);

var exeBtn=document.getElementById('execute');
exeBtn.addEventListener('click',divisionExecute,false);

var subOneBtn=document.getElementById('subOne');
subOneBtn.addEventListener('click',subOne,false);

var changeNextBtn=document.getElementById('changeNext');
changeNextBtn.addEventListener('click',changeNext,false);

DPinit();
init();
draw();
draw();