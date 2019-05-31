const mysql = require('mysql');
// co-mysql
const cfg = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'kaikeba' //确保数据库存在
};

// 创建连接对象
const conn = mysql.createConnection(cfg);

//数据库查询语句
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
const SELECT_SQL = `SELECT * FROM test`;

// 连接数据库
conn.connect(err => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('mysql连接成功');
  conn.query(CREATE_SQL, err => {
    if (err) {
      console.log(err);
      throw err;
    }
    conn.query(INSERT_SQL, 'hello', (err,res) => {
      console.log(res);
      conn.query(SELECT_SQL, (err,res) => {
        console.log(res);
      });
    });
  });
});
