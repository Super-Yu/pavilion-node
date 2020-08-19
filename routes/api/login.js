
const router = require('express').Router();

router.get('/',(req,res)=>{
  // console.log(req.body);// 获取post传值 bodyParser对req内容进行了改写
  // req.cookies.memberID // 未加密cookie获取
  // req.signedCookies.memberID // 加密cookie获取

  res.send('执行登录'+req.signedCookies.memberID)
})

module.exports = router