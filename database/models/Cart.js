const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    let alias = "Cart";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "Detail",
        timestamps: false
    };
    const Cart = Sequelize.define(alias,cols,config);

    Cart.associate = function(models){
        Cart.belongsTo(models.Product,{
            as: "product",
            foreignKey: "product_id"
        });
        Cart.belongsTo(models.Order,{
            as: "order",
            foreignKey: "order_id"
        });
    };

    return Cart;
}