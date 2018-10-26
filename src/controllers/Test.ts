import { GET, POST, PUT, PATCH, DELETE, Path, PathParam } from 'typescript-rest';
import { Test } from '../models/Test';

/**
 * Testing Controller 
 */
@Path('/test')
export class TestController {

    @GET
    async getTests(): Promise<Test[]> {
        return await Test.findAll();
    }

    @Path(':id')
    @GET
    async getTest(@PathParam('id') id: number): Promise<Test> {
        return await Test.findById(id);
    }

    @POST
    async postTest(test: Test): Promise<Test> {
        return await Test.build(test).save();
    }

    @Path(':id')
    @PUT
    async putTest(@PathParam('id') id: number, test: Test): Promise<Test> {
        let oldTest = await Test.findById(id);
        return await oldTest.update(test);
    }

    @Path(':id')
    @PATCH
    async patchTest(@PathParam('id') id: number, test: Test): Promise<Test> {
        let oldTest = await Test.findById(id);
        return await oldTest.update(test);
    }

    @Path(':id')
    @DELETE
    async deleteTest(@PathParam('id') id: number): Promise<void> {
        let test = await Test.findById(id);
        return await test.destroy();
    }
}
