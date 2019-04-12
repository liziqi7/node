let rate;

function rmbtoDollar(rmb){
    return rmb/rate;
}


module.exports=function(r){
    rate=r;
    return {rmbtoDollar}
}