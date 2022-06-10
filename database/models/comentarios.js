module.exports = function(sequelize, dataTypes){
    
    let alias = 'Comentarios'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        texto: {
            type: dataTypes.STRING
        },
        imagen:{
            type: dataTypes.STRING
        },
        producto_id: {
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'comentarios', 
        timestamps: false, 
        underscored: true, 
    }

    const Comentarios = sequelize.define(alias, cols, config);

    //Relación con productos
    /*Comentarios.associate = function (models) { 
        Comentarios.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "producto_id"
        })
    };*/

    //Relación con usuarios
    /*Comentarios.associate = function (models) { 
        Comentarios.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "usuario_id"
        })
    };*/

    return Comentarios;
}