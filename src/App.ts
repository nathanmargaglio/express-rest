import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Sequelize } from "sequelize-typescript"
import { DB } from "./db";

// Creates and configures an ExpressJS web server.
class App {

	// ref to Express instance
	public express: express.Application;
	public sequelize: Sequelize;

	//Run configuration methods on the Express instance.
	constructor(test=false) {
	this.express = express();
        this.middleware();
        this.sequelize = new DB(test).sequelize;
    }

	// Configure Express middleware.
	private middleware(): void {
			this.express.use(logger('dev'));
			this.express.use(bodyParser.json());
			this.express.use(bodyParser.urlencoded({ extended: false }));
	}

}

export default App;
