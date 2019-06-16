const conf = require('./conf');
// 创建客户端
const MongoClient = require('mongodb').MongoClient;
const EventEmitter=require('events');

class Mongodb {
  constructor(conf) {
    this.conf = conf;
    this.emitter=new EventEmitter();
    this.client = new MongoClient(conf.url, { useNewUrlParser: true });  
    this.client.connect(err => {
      if (err) {
        throw err;
      }
      console.log('连接数据库成功');
      this.emitter.emit('connect')
    });
  }
  //监听事件方法
  once(event,cb){
      this.emitter.once(event,cb)
  }
  //获取集合
  col(colName, dbName = this.conf.dbName) {
    return this.client.db(dbName).collection(colName);
  }
}

module.exports = new Mongodb(conf);
