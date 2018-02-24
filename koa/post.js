const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');



const app = new Koa();



router.get('/', async (ctx, next) => {
    var html = '';
    html = '<h1>login</h1>'
        +'<form action="/signin" method="post">'
        + '<p><label for="name">name:<input type="text" name="name" value=""></label></p>'
        + '<p><label for="password">password:<input type="password" name="password" value=""></label></p>'
        +'<p><input type="submit" value="登录"></p>'
        +'</form>';
    ctx.response.body = html;
})

router.post('/signin',async(ctx,next)=>{
    var name=ctx.request.body.name||'',
        password=ctx.request.body.password||'';
        if(name=='koa'&&password=="123456"){
            ctx.response.body=`<h1>Welcome , ${name}</h1>`
        }else{
            ctx.response.body='<h1>Login failed!</h1><p><a href="/">Try again</a></p>';
            
        }
})

app.use(bodyparser());
app.use(router.routes())
app.listen(3000)