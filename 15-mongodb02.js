const mongo = require('./models/db');
const testdata = require('./models/testdata');
const path = require('path');
const express = require('express');

const app = express();

app.get('/fruit-market', (req, res) => {
  res.sendFile(path.resolve('./15-mongodb02.html'));
});

// 分页查询果蔬数据
app.get('/api/list', async (req, res) => {
  // 分页数据
  const { page } = req.query; // api/list?page=3
  // 查询
  try {
    const col = mongo.col('fruits');
    const fruits = await col
      .find()
      .skip((page - 1) * 4)
      .limit(4)
      .toArray();
    // 查询总条数
    const total = await col.find().count();
    res.json({
      ok: 1,
      data: { fruits, pagination: { total, page } }
    });
  } catch (error) {}
});

app.listen(3000);
