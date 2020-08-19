const router = require('express').Router();

router.get('/',(req,res)=>{
  res.send('你好 express');
})

// 动态路由 & 路由级中间件
router.get('/home/:id',(req,res,next)=>{
  if(req.param('id') === 'base'){// 获取动态路由参数
    next(); 
    return;
  }
  res.send(req.param('id'))
})

router.get('/home/base',(req,res)=>{
  // console.log(req.query); // 获取get传值
  res.send('base')
})

// 错误处理中间件
router.use((req,res,next)=>{
  let err = new Error();
  err.status ='pageNotFound';
  next(err)
})

module.exports = router