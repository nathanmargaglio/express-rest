import { Sequelize } from "sequelize-typescript"

export class DB {
		public sequelize: Sequelize;

		constructor(test=false) {
				if (test){
						this.sequelize = this.testSequelizer();
				} else {
						this.sequelize = this.sequelizer();
				}
		}

		private sequelizer(): Sequelize {
				if (process.env.DATABASE_URL) {
						return new Sequelize({
								url: process.env.DATABASE_URL,
								modelPaths: [__dirname + '/models']								
						});		
				} else {
						return new Sequelize({
								database: 'api_dev',
								dialect: 'postgres',
								username: 'postgres',
								password: null,
								port: 15432,
								modelPaths: [__dirname + '/models']
						});
				}
		}

		private testSequelizer(): Sequelize {
				return new Sequelize({
						database: 'api_test',
						dialect: 'postgres',
						username: 'postgres',
						password: null,
						port: 15432,
						modelPaths: [__dirname + '/models']
				});
		}
}
