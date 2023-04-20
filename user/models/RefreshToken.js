const {Sequelize,DataTypes} = require('sequelize');
module.exports = (Sequelize,DataTypes)=>{
    const RefreshToken = Sequelize.define('RefreshToken',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        token:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        usersId:{
            field:'users_id',
            type:DataTypes.INTEGER,
            allowNull:false
        },
        createdAt:{
            field:'created_at',
            type:DataTypes.DATE,
            allowNull:false,
        },
        updatedAt:{
            field:'updated_at',
            type:DataTypes.DATE,
            allowNull:false,
        }
    },{
        tableName:'refresh_tokens',
        timestamps:true
    });
    return RefreshToken;
}