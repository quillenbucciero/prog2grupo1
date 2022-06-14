module.exports = function(sequelize, dataTypes){
    
    let alias = 'Productos'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion : {
            type: dataTypes.STRING,

        },
        imagen: {
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

    
    //Relación con usuarios.
    Productos.associate = function (models) { //productos
        Productos.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "usuario_id"
        })
    };



    //Comentarios
    Productos.associate = function (models) { 
        Productos.hasMany(models.Comentarios, {
            as: "comentarios",
            foreignKey: "producto_id"
        })
    };
    
    return Productos;
    

}