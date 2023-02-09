var y;
m =0;
function start(){

y = setInterval(run, 100);

function run(){
    m+= 5;
    var x =  document.getElementById("img");
    if(m < 1200)x.style.marginLeft = m + 'px';
    else{
        m =0;
        x.style.marginLeft = m + 'px';
    }
}
}

function stop(){ 
    clearInterval(y);
}