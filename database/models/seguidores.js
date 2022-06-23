module.exports = function(sequelize, dataTypes){
    
    let alias = 'Seguidores'

    let cols = {
        seguidor_id: {
            type: dataTypes.INTEGER
        },
        seguido_id: {
            type: dataTypes.INTEGER
        },
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
        deleted_at: {
            type: dataTypes.DATE,
            allowNull: true,
        }

    };

    let config = {
        tableName: 'seguidores', 
        timestamps: true, 
        underscored: true, 
    };

    const Seguidores = sequelize.define(alias, cols, config);

    return Seguidores;

}