// 内建模块
const os=require('os');
const cpuStat=require('cpu-stat');


function showState(){
    const mem=os.freemem()/os.totalmem()*100;
    console.log(`内存占有率${mem}%`)
    
    
    // 第三方模块       
    cpuStat.usagePercent((err,percent)=>{
        console.log(`cpu占用率：${percent}`)
    })
}
setTimeout(showState,1000)
const conf=require('./02-conf');
console.log(conf);

const {rmbtoDollar}=require('./02-currency')(6.8)

console.log(rmbtoDollar(10));

