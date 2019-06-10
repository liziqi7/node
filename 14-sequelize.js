const Sequelize = require("sequelize");

// 建立连接
const sequelize = new Sequelize("kaikeba", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false
});

// 1.定义模型 Model - Table
const Fruit = sequelize.define(
  "fruit",
  {
    name: {
      type: Sequelize.STRING(20),
      get() {
        const name = this.getDataValue("name");
        const price = this.getDataValue("price");
        return `${name}(价格：${price})`;
      }
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: "价格字段必须输入数字"
        },
        min: {
          args: [0],
          msg: "价格字段必须大于0"
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
        return this.getDataValue("stock") + "kg";
      }
    },
    setterMethods: {
      amout(val) {
        const idx = val.indexOf("kg");
        const stock = val.slice(0, idx);
        this.setDataValue("stock", stock);
      }
    }
  }
);
// 模型扩展
Fruit.classify = function(name) {
  const tropicFruits = ["香蕉", "芒果"];
  return tropicFruits.includes(name) ? "热带水果" : "其他水果";
};

["草莓"].forEach(f => console.log(Fruit.classify(f)));

//实例方法
Fruit.prototype.totalPrice = function(count) {
  return this.price * count;
};

//同步
Fruit.sync({ force: true })
  .then(() => {
    return Fruit.create({
      name: "香蕉",
      price: 3.5
    });
  })
  .then(async () => {
    // 查询
    const fruits = await Fruit.findAll();
    Fruit.findAll().then(fruit => {
      console.log(JSON.stringify(fruit));

      // 更新实例
      //   fruit[0].amout = "100kg";
      //   fruit[0].save();

      //   console.log(fruit[0].totalPrice(50));

      // 数据查询
      // id
      // Fruit.findById(1)
      // 条件 where
      Fruit.findOne({ where: { name: "香蕉" } }).then(fruit => console.log(fruit.get()));
      // 查询操作符
      const Op = Sequelize.Op;
      Fruit.findAll({
        where: {
          price: {
            [Op.lt]: 5
          }
        }
      }).then(fruits => console.log(fruits[0].get()));

      // 聚合
      Fruit.max("price");
      Fruit.sum("price");

      //更新
      Fruit.update({ price: 5 }, { where: { id: 1 } });

      // 删除
      //   Fruit.destroy({ where: { id: 1 } });
    });
  })
  .catch(err => {
    console.log(err.message);
  });
