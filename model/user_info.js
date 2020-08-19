const mongoose = require('./db');

// 3、集合(表)的模板
const UserInfoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  // name: String,  简单写法
  name: {
    type: String,
    // index: true, // 普通索引
    // unique: true, // 唯一索引
    tirm:true, // 预定义模式修饰符 去掉空格
    // set(param){ // 自定义修饰符
    //   return param+11111
    // }
    required: true, // 数据校验
    maxlength: 10, // 长度校验校验
  },
  age:{
    type: Number,
    min:0, // 最小数值的校验 只能用在Number类型上
    max:150, // 最大数值校验 只能用在Number类型上
  },
  identity_number: {
    type: String,
    validate: function(data){ // 自定义数据校验
      return data.length === 15 || data.length === 18
    }
  },
  phone_number: {
    type: String,
    match: /^1[0-9]{10}$/,  // 正则校验
  },
  sex: {
    type: Number,
    enum: [1,2],  // 枚举值的校验
  },
  address: String,
  age: Number,
  wx_id:  {
    type: String,
    default: '' // 默认参数
  },
})

// 自定义静态方法
UserInfoSchema.statics.staticsFun = function(a,b) {
  this.find();// this指向当前model 所以能用model的方法
}

// 自定义实例方法
UserInfoSchema.methods.instanceFun = function() {
  console.log(this.name); // this指向实例的数据 所以能拿到数据中的name
}

// 4、定义数据库模型       tip: mongoose默认指向的集合名后面有‘s’如 写User，默认找的users集合 所以如果要找不是加s的 要加第三个参数进行指定（相当于重定向加了该参数后 可以指定为任何集合）
const UserInfoModel = mongoose.model('user_info',UserInfoSchema,'user_info'); 

module.exports = UserInfoModel;

// // 外部使用封装好的该文件
// // 5、操作数据库
// // const UserInfoModel = require('./model/user_info')
// /**
//  * new model({}).save():插入/更新单条数据  
//  * tip：
//  * 1、需要先实例化模型 
//  * 2、这是个异步操作 
//  * 3、传入_id时，为插入数据，自动生成_id。有_id并可以在集合中找到，更新数据。有传_id在集合中没有匹配到该_id,加一条自己设置_id的数据
//  */
// const user = new UserInfoModel({
//   name:'李四',
//   age: 60,
//   identity_number: '123456789012345',
//   phone_number: '19999999900',
//   sex: 1
// })
// user.save(function (err,res) {
//   if(err) {
//     return console.log(err);
//   }
//   console.log('成功存入')
// })

// /**
//  * model.find()：查找数据。 详解：https://segmentfault.com/a/1190000021010300
//  */
// UserInfoModel.find({name:'李四'},function (err,res) {
//   if(err){
//     return console.log(err);
//   }
//   console.log(res)
// })

/**
 * model.aggregate():聚合管道  对集合中的文档进行变换和组合。表关联查询、数据的统计。
 * mongoose.Types.objectId('123g23g123b12h3h123j)  将普通字符串转化为objectId格式。
 */
// UserInfoModel.aggregate([
//   {$lookup:{
//     from: 'order',
//     localField: '_id',
//     foreignField: 'user_id',
//     as: 'items'
//   }}
// ],function (err,res) {
//   if(err){
//     return console.log(err);
//   }
//   console.log(res)
// })