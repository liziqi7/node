const MongoClient = require('mongodb').MongoClient;

// 连接URL
const url = 'mongodb://localhost:27017';
//用户名密码
// const url='mongodb://user:password@localhost:27017'

// 数据库名
const dbname = 'test';
(async function() {
  const client = new MongoClient(url, { useNewUrlParser: true }); //解释器
  try {
    // 1.连接数据库，返回promise
    await client.connect();
    console.log('连接成功');

    // 2.获取数据库
    const db = client.db(dbname); // 支持连接池，默认回收

    // 3.获取集合 相当于table
    const fruitColl = db.collection('fruits');

    // 4.插入文档，返回promise
    let r = await fruitColl.insertOne({ name: '芒果', price: 20.0 });
    console.log(r.result);

    // 5.查询文档
    r = await fruitColl.findOne();
    console.log('查询结果：', r);

    //6.更新文档

    r = await fruitColl.updateOne({ name: '芒果' }, { $set: { name: '苹果' } });
    console.log('更新结果：', r.result);

    // 7.删除文档
    r = await fruitColl.deleteOne({ name: '苹果' });
    console.log('删除结果:', r.result);
  } catch (e) {
    console.log(e);
  }
  //   client.close();
  //   console.log(client.close());
})();
