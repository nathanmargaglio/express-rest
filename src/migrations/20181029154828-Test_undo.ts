import { QueryInterface, SequelizeStatic } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
			/*
			 * This undoes the example migration from before.
			 */
			return queryInterface.removeColumn(
						'test',
						'change'
			);
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
			return queryInterface.addColumn(
						'test',
						'change',
						{
								type: Sequelize.STRING,
								allowNull: true
						}
				);
	}
};
