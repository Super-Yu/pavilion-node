const router = require('express').Router();
const login = require('./api/login');

router.use('/login',login);


// 错误处理中间件
router.use((req,res,next)=>{
  let err = new Error('我这出错了呀');
  err.status ='apiNotFound';
  next(err)
})

module.exports = router;