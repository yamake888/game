var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var n = 10000;//A_iの最大値
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
    for(var i=0;i<m;++i)if(a[i]!=1)return false;
    return true;
}
/* 勝利判定 */
/* DP 前計算始め */
function DPinit(){
    for(var i=0;i<=n+10;++i){
        dp.push(-1);
        div.push([]);
    }
    dp[0]=1;
    function mex(array){
        for(var i=0;i<=n;++i){
            var tmp=array.indexOf(i);
            if(tmp==-1)return i;
        }
        return -1;
    }
    dp[1]=1;
    for(var i=2;i<=n+10;++i){
        var buf=[];
        //buf.push(dp[i-1]);
        for(var j=i;j<=n;j+=i){
            div[j].push(i);
        }
        for(var j=0;j<div[i].length;++j){
            buf.push(dp[i/div[i][j]]);
        }
        dp[i]=mex(buf);
    }
    //document.write(dp);
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
}
/* 初期化終わり */

/* 数字表示部分 */
ctx.font="32px serif";
var flag=false;
var last=n;
var lastString="";
var savedString="";

function drawLittleString(printString,updateFlag){
    ctx.font="18px serif";
    if(updateFlag)ctx.fillText(lastString,0,50);
    else ctx.fillText(savedString,0,50);
    var pointerString = "選択中:\t";
    pointerString+=a[pointer];
    pointerString+='\t/\t割るなら\t';
    var aVal=a[pointer];
    if(div[aVal].length>0)pointerString+=div[aVal][cur[pointer]];
    ctx.fillText(pointerString,0,150);
    ctx.font="32px serif";
    if(!updateFlag){
        lastString=savedString;
        return;
    }
    savedString=lastString;
    lastString = "last = ";
    lastString += printString;
}

function draw(updateFlag=true){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var printString="";
    for(var i=0;i<m;++i){
        printString+=a[i];
        if(i==m-1)break;
        printString+='\t/\t';
    }
    drawLittleString(printString,updateFlag);
    ctx.fillText(printString,0,100);
    //ctx.fillText(getXorSum(),300,200);
}
/* 数字表示部分終わり */

/* コンピュータ計算部分 */
function comChoice(){
    draw();
    if(getXorSum()==0){
        for(var i=0;i<m;++i){
            if(a[i]>1){
                var r=Math.floor(Math.random()*(div[a[i]].length));
                if(false&&r>=div[i].length){
                    a[i]-=1;
                }
                else{
                    a[i]/=div[a[i]][r];
                }
                draw();
                return;
            }
        }
    }
    /* COM 計算 */
    for(var i=0;i<m;++i){
        var bufXor=(getXorSum()^dp[a[i]]);
        if(false&&bufXor==dp[a[i]-1]){
            a[i]-=1;
            break;
        }
        else{
            var bufFlag=false;
            for(var j=0;j<div[a[i]].length;++j){
                var nextA=a[i]/div[a[i]][j];
                if(bufXor==dp[nextA]){
                    bufFlag=true;
                    a[i]=nextA;
                    break;
                }
            }
            if(bufFlag)break;
        }
    }
    draw();
    if(judgeWin()){
        window.alert("負け！");
    }
    /* COM 計算 */
}
/* コンピュータ計算部分 */

function updateDivideNumber(){
    // 次の約数へ
    if(div[a[pointer]].length==0)return;
    cur[pointer]+=1;
    cur[pointer]%=div[a[pointer]].length;
    draw(false);
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
/*
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
*/

function changeNext(){
    // 隣の要素を選択
    cur[pointer]=0;
    pointer+=1;
    pointer%=m;
    draw(false);
}

var divideBtn=document.getElementById('divide');
divideBtn.addEventListener('click',updateDivideNumber,false);

var exeBtn=document.getElementById('execute');
exeBtn.addEventListener('click',divisionExecute,false);

//var subOneBtn=document.getElementById('subOne');
//subOneBtn.addEventListener('click',subOne,false);

var changeNextBtn=document.getElementById('changeNext');
changeNextBtn.addEventListener('click',changeNext,false);

DPinit();
init();
draw();
draw();
