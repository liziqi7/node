const Koa=require('koa');
const router=require('koa-router')();

const app=new Koa();


app.use(async(ctx,next)=>{
    // console.log(ctx.request.toJSON())
    // for(var i in ctx.request){
    //     console.log('↓-------------------');
    //     console.log(i+":");
    //     console.log(ctx.request[i]);
    //     console.log('↑-------------------');
    // }
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})
 router.get('/hello/:name',async(ctx,next)=>{
     var name=ctx.params.name;
     ctx.response.body=`<h1>Hello,${name}!</h1>`;
 })


 router.get('/',async(ctx,next)=>{
    ctx.response.body="<h1>index</h1>";
 })

 app.use(router.routes());

 app.listen(3000);
 