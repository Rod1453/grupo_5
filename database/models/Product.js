const { Sequelize, DataTypes } = require("sequelize");

module.exports= (Sequelize,DataTypes) => {
    const alias = "Product";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editorial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paginas: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        idioma: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_tapa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        sinopsis: {
            type: DataTypes.TEXT
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_emision: {
            type: DataTypes.DATE,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: "Product",
        timestamps: false
    }

    const Product = Sequelize.define(alias,cols,config);

    Product.associate = function(models){
        Product.belongsTo(models.Theme,{
            as: "theme",
            foreignKey: "theme_id"
        });
        Product.hasMany(models.Cart,{
            as: "cart",
            foreignKey: "product_id"
        });
        Product.belongsToMany(models.Order,{
            through: models.Cart, foreignKey: 'id'
        });
    };

    return Product;
}