'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Status.belongsTo(models.User, {
          foreignKey: 'userID',
          onDelete: 'CASCADE'
        })

    }
  };
  Status.init({
    imdbID: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};
