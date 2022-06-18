module.exports = function(sequelize, dataTypes){
    
    let alias = 'Productos'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        imagen: {
            type: dataTypes.STRING,

        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion : {
            type: dataTypes.STRING,

        },        
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        usuario_id : {
            type: dataTypes.INTEGER,
        }

    }
    let config = {
        tableName: 'productos', 
        timestamps: true, 
        underscored: true, 
    }

    const Productos = sequelize.define(alias, cols, config);

    
    //Relación con usuarios y comentarios
    Productos.associate = function (models) { 
        Productos.belongsTo(models.Usuarios, {
            as: "usuarioProducto",
            foreignKey: "usuario_id"
        }),
        Productos.hasMany(models.Comentarios, {
            as: "comentarioProducto",
            foreignKey: "producto_id"
        })
    };
    
    return Productos;
    

}