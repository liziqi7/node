const Sequelize = require('sequelize');

// 建立连接
const sequelize = new Sequelize('kaikeba', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});
// 1:N 关联查询

const Player = sequelize.define('player', { name: Sequelize.STRING });
const Team = sequelize.define('team', { name: Sequelize.STRING });

// 添加team id 到player表作为外键
Player.belongsTo(Team); // 1端建立关系
Team.hasMany(Player); // N端建立关系

sequelize.sync({ force: true }).then(async () => {
  await Team.create({ name: '火箭' });
  await Player.bulkCreate([
    {
      name: '哈登',
      teamId: 1
    },
    {
      name: '保罗',
      teamId: 1
    }
  ]);

  //   1端查询
  const players = await Player.findAll({ include: [Team] });
  console.log(JSON.stringify(players, null, '\t'));

  //N端查询
  const team = await Team.findOne({
    where: { name: '火箭' },
    include: [Player],
    skip: 0,
    limit: 10,
    sort: { price: 1 } // 1：升序（按照价格从低到高排序）  -1：倒序
  });

  console.log(JSON.stringify(team, null, '\t'));
});
