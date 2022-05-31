module.exports = function(sequelize, dataTypes){
    
    let alias = 'prog2'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        descripcionText : {
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
        tableName: 'movies', 
        timestamps: false, 
        underscored: true, 
    }

    const prog2 = sequelize.define(alias, cols, config);

    return prog2;

}