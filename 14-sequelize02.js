const Sequelize = require('sequelize');

// 建立连接
const sequelize = new Sequelize('kaikeba', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
});

// 1.定义模型 Model - Table
const Fruit = sequelize.define(
  'fruit',
  {
    name: {
      type: Sequelize.STRING(20),
      get() {
        const name = this.getDataValue('name');
        const price = this.getDataValue('price');
        return `${name}(价格：${price})`;
      }
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: '价格字段必须输入数字'
        },
        min: {
          args: [0],
          msg: '价格字段必须大于0'
        }
      }
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    timestamps: false, //关闭时间戳
    freezTable: true, //冻结表名
    getterMethods: {
      amout() {
        return this.getDataValue('stock') + 'kg';
      }
    },
    setterMethods: {
      amout(val) {
        const idx = val.indexOf('kg');
        const stock = val.slice(0, idx);
        this.setDataValue('stock', stock);
      }
    }
  }
);
// 模型扩展
Fruit.classify = function(name) {
  const tropicFruits = ['香蕉', '芒果'];
  return tropicFruits.includes(name) ? '热带水果' : '其他水果';
};

['草莓'].forEach(f => console.log(Fruit.classify(f)));

//实例方法
Fruit.prototype.totalPrice = function(count) {
  return this.price * count;
};

//同步
Fruit.sync({ force: true })
  .then(() => {
    // 创建一条数据
    return Fruit.create({
      name: '香蕉',
      price: 3.5
    });
  })
  .then(async () => {
    const Op = Sequelize.Op;
    // 查询
    const fruits = await Fruit.findAll({
      where: {
        price: { [Op.lt]: 5 }
      }
    });
    // console.log(fruits[0].get());

    await Fruit.update({ price: 5 }, { where: { id: 1 } });

    // 删除
    await Fruit.destroy({ where: { id: 1 } });
  })
  .catch(err => {
    console.log(err.message);
  });
