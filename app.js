const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const index = require('./routes')
const api = require('./routes/api')
const app = express();

//配置模板引擎（不用引入，express中已经配置） 默认模板路径是views
app.set('view engine', 'ejs');
// 配置第三方中间件bodyParser 接收表单post数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 配置第三方中间件cookieParser 使用cookie
app.use(cookieParser('pavilion'))


// 内置中间件 (托管静态文件)
app.use(express.static('static'));

// 应用级中间件（用于权限判断），
app.use((req,res,next)=>{
  // 设置cookie
  res.cookie('memberID','1111',{
    maxAge:1000*60, // 多少毫秒过期
    httpOnly: true, // js无法读取cookie信息
    signed: true, // 加密的cookie。 配置中间件的时候需要传入加密参数:app.use(cookieParser('private')) 获取时:req.signedCookies
    // domain:'.baidu.com' // 可以配置为多个域名共享cookie
  });
  next(); // 向下执行
})


// 配置外部路由模块
app.use('/project',index);
app.use('/api',api);


// 错误处理中间件
app.use((err,req,res,next)=>{
  switch (err.message,err.status) {
    case 'pageNotFound':
      let content = '您所访问的页面不存在！'
      res.render('404',{
        content
      })
      break
      ;
    case 'apiNotFound':
      res.set('Content-Type','application/json');
      res.status(200);
      res.send(err)
      break;
    default:
      break;
  }
})


app.listen(3000,function() {})