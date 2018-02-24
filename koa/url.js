const Koa=require('koa');
var app=new Koa();

app.use(async(ctx,next)=>{
    var path=ctx.request.path;
    console.log(path)
    if(path=='/'){
        ctx.response.body="index.html";
    }else if(path=='/test'){
        ctx.response.body="test.html";
    }else{
        ctx.response.body=`${path}`+".html";
    }

})

app.listen('3000')






