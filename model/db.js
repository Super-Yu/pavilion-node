/**
 * 该文件建立与数据库的链接
 */
// 1、导入mongoose
const mongoose = require('mongoose'); 

// 2、建立数据库连接。 第一次调用时连接数据库，后面调用的时候 数据库已连接就不会再执行了。
mongoose.connect('mongodb://127.0.0.1:27017/pavilion',{ // 有密码时这么连 mongodb://admin:123456@127.0.0.1:27017/pavilion
  // 两个警告信息，需要设成true
  useNewUrlParser:true, // 使用新的url字符串解释器
  useUnifiedTopology:true // 表示使用统一的拓扑
  },function (err) {
    if(err){
      console.log('err',err);
      return;
    }
    console.log('数据库连接成功')
  }
);

module.exports = mongoose;

