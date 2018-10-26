import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Sequelize } from "sequelize-typescript"
import controllers from '../src/controllers';
import { Server } from "typescript-rest";
import { Test } from "../src/models/Test";

import App from '../src/App';

let _app = new App(true);
let app = _app.express;
Server.buildServices(app, ...controllers);

chai.use(chaiHttp);
const expect = chai.expect;

describe('test', () => {

		before(function(){
				// This will reset the database
				// i.e., the tables will exist,
				// but they will be empty
				return _app.sequelize.sync({force: true});
		});

		it('should be json', () => {
				return chai.request(app).get('/test')
						.then(res => {
								expect(res.type).to.eql('application/json');
						});
		});

		let testId: number;
		it('should create test', () => {
				return chai.request(app).post('/test')
						.send({value: "Some Value :D"})
						.then(res => {
								expect(res.body.value).to.eql('Some Value :D');
								testId = res.body.id;
						});
		});
		
		it('should get test', () => {
				return chai.request(app).get(`/test/${testId}`)
						.then(res => {
								expect(res.body.value).to.eql('Some Value :D');
						});
		});
		
		it('should create another test', () => {
				return chai.request(app).post('/test')
						.send({value: "Some OTHER Value :o"})
						.then(res => {
								expect(res.body.value).to.eql('Some OTHER Value :o');
						});
		});
		
		it('should get all tests', () => {
				return chai.request(app).get('/test')
						.then(res => {
								expect(res.body).to.have.lengthOf(2);
						});
		});

		it('should replace test', () => {
				return chai.request(app).put(`/test/${testId}`)
						.send({value: "Some New Value :>"})
						.then(res => {
								expect(res.body.value).to.eql('Some New Value :>');
						});
		});

		it('should update test', () => {
				return chai.request(app).put(`/test/${testId}`)
						.send({value: "Some Even Newer Value :|"})
						.then(res => {
								expect(res.body.value).to.eql('Some Even Newer Value :|');
						});
		});


		it('should delete test', () => {
				return chai.request(app).del(`/test/${testId}`)
						.then(res => {
								expect(res.body).to.have.lengthOf(0);
						});
		});

		it('should get all remaining tests', () => {
				return chai.request(app).get('/test')
						.then(res => {
								expect(res.body).to.have.lengthOf(1);
						});
		});
});
