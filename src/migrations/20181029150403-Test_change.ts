"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
				/*
				 * Here's an example of a migration.
				 * We're just adding a dummy 'change' column
				 * to the test table.
				 */
				return queryInterface.addColumn(
						'test',
						'change',
						{
								type: Sequelize.STRING,
								allowNull: true
						}
				);
    },
    down: function (queryInterface, Sequelize) {
        /*
				 * And here's the "undo" migration,
				 * that will remove the 'change' column.
				 */
				return queryInterface.removeColumn(
						'test',
						'change'
				);
    }
};
