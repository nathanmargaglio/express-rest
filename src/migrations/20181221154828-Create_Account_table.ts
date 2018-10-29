import { QueryInterface, SequelizeStatic } from 'sequelize';
import { DB } from "./../db";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
			/*
			 * This creates an account table. 
			 */
			let db = new DB().sequelize;
			return db.model('Account').sync();
	},

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
			return queryInterface.dropTable(
						'account'
				);
	}
};
