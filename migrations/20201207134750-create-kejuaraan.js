'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kejuaraans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      dueDate: {
        type: Sequelize.STRING
      },
      lokasi: {
        type: Sequelize.STRING
      },
      totPeserta: {
        type: Sequelize.STRING
      },
      UserId: {
        allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kejuaraans');
  }
};