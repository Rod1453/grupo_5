const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        }
    };
    let config = {
        tableName: "Order",
        timestamps: false
    };
    const Order = Sequelize.define(alias,cols,config);

    Order.associate = function(models){
        Order.belongsTo(models.User,{
            as: "user",
            foreignKey: "user_id"
        });
        Order.hasMany(models.Cart,{
            as: "cart",
            foreignKey: "order_id"
        });
        Order.belongsToMany(models.Product,{
            through: models.Cart, foreignKey: 'id'
        });
    };

    return Order;
}