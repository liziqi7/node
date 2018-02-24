const Koa = require('koa');
const app=new Koa();


app.use(async(ctx,next)=>{
    console.log("a")
//    console.log(`${ctx.request.method} ${ctx.request.url}`)
    await next();
    console.log("1")
})


app.use(async(ctx,next)=>{    
    console.log("b")
    // const start=new Date().getTime();
    await next();
    // console.log(new Date().getTime()-start)
    console.log("2")
})


app.use(async(ctx,next)=>{
    console.log("c")
    await next();
    console.log("3")
    ctx.response.type="text/html";
    ctx.response.body='<h1>hello koa2!</h1>'
})


app.listen(3000);

console.log('koa running at http://127.0.0.1:3000')
