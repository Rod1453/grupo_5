const { Sequelize, DataTypes } = require("sequelize");

module.exports= (Sequelize,DataTypes) => {
    const alias = "User";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING
        }
    };
    const config = {
        tableName: "User",
        timestamps: false
    };

    const User = Sequelize.define(alias,cols,config);

    return User;
}