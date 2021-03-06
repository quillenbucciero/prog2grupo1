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
        created_at: {
            type: dataTypes.DATE,
            allowNull:false,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        producto_id: {
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        },
    }
    let config = {
        tableName: 'Comentarios', 
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

