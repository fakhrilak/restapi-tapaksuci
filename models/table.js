'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  };
  Table.init({
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING,
    kontingen: DataTypes.STRING,
    nilai: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    KejuaraanId: DataTypes.INTEGER,
    no: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Table',
  });
  return Table;
};