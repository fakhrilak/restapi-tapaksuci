'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kejuaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kejuaraan.hasMany(models.Table, {
				as: 'Tables'
			});
      Kejuaraan.hasMany(models.Daftar, {
				as: 'Daftars'
			});
    
    }
  };
  Kejuaraan.init({
    nama: DataTypes.STRING,
    dueDate: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    totPeserta: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kejuaraan',
  });
  return Kejuaraan;
};