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
        producto_id: {
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull:true,
        }
    }
    let config = {
        tableName: 'comentarios', 
        timestamps: true, 
        underscored: true, 
    }

    const Comentarios = sequelize.define(alias, cols, config);

    //Relación con productos y usuarios
    Comentarios.associate = function (models) { 
        Comentarios.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "producto_id"
        }),
        Comentarios.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "usuario_id"
        })
    };


    return Comentarios;
}

