const Sequelize = require('sequelize');

// 建立连接
const sequelize = new Sequelize('kaikeba', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});

// 1.定义模型 Model - Table
const Fruit = sequelize.define('fruit', {
  name: {
    type: Sequelize.STRING(20)
  }
});

const Category = sequelize.define('category', { name: Sequelize.STRING });

Fruit.FruitCategory = Fruit.belongsToMany(Category, {
  through: 'FruitCategory'
});

sequelize.sync({ force: true }).then(async () => {
  await Fruit.create(
    {
      name: '香蕉',
      categories: [{ id: 1, name: '热带' }, { id: 2, name: '温带' }]
    },
    {
      include: [Fruit.FruitCategory]
    }
  );
  console.log('Category', Category);

  // 多对多联合查询
  const fruit = await Fruit.findOne({
    where: { name: '香蕉' },
    include: [{ model: Category, through: { attributes: ['id', 'name'] } }]
  });

  console.log(JSON.stringify(fruit, 'null', '\t'));
});
