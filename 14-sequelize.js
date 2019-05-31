const Sequelize=require('sequelize');

// 建立连接
const sequelize= new Sequelize('kaikeba','root','123456',{
    host:'location',
    dialect:'mysql',
    operatorsAliases:false
})


