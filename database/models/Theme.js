const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
    let alias = "Theme";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "Theme",
        timestamps: false
    };
    const Theme = Sequelize.define(alias,cols,config);

    Theme.associate = function(models){
        Theme.hasMany(models.Product,{
            as: "product",
            foreignKey: "theme_id"
        });
    };

    return Theme;
}