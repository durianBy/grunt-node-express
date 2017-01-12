/**
 * Created by zhangbiying on 2017/1/4.
 */
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

function *foo(x){
    var y = 2 * (yield (x+1));
    var z = yield (y/3);
    return (x+y+z)
}
app.set('port', process.env.PORT || 3000);

// view engine setup
// 设置视图目录和文件后缀名
app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'jade');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'web/public')));

// cookie
app.use(cookieParser('durian'));//设置cookie密钥
app.use(cookieSession({
    name:'durian',
    keys: ['key1', 'key2']
}));

//主页路由
app.get('/',function(req,res){
    req.session.cookie = "lalalalalala";
    req.session.key = "elelelelel";
    res.render("common");
});

//关于页面路由
app.get('/about',function(req,res){
    res.render("about",{
        cookie:req.session.cookie,
        key:req.session.key
    })
});

//定制404页面
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404-Not Found');
});

//定制500页面
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500-Server Error');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' + app.get('port'));
});















