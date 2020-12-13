'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Daftars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      kelas: {
        type: Sequelize.STRING
      },
      kontingen: {
        type: Sequelize.STRING
      },
      nilai: {
        type: Sequelize.INTEGER
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
      KejuaraanId: {
        allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Kejuaraans',
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
    await queryInterface.dropTable('Daftars');
  }
};