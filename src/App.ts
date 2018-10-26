import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Sequelize } from "sequelize-typescript"
import pg = require('pg');

// Creates and configures an ExpressJS web server.
class App {

	// ref to Express instance
	public express: express.Application;
	public sequelize: Sequelize;

	//Run configuration methods on the Express instance.
	constructor(test=false) {
	this.express = express();
        this.middleware();
        if (test){
            this.sequelize = this.testSequelizer();
        } else {
            this.sequelize = this.sequelizer();
        }
    }

	// Configure Express middleware.
	private middleware(): void {
			this.express.use(logger('dev'));
			this.express.use(bodyParser.json());
			this.express.use(bodyParser.urlencoded({ extended: false }));
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

export default App;
