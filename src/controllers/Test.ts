import { GET, POST, PUT, PATCH, DELETE, Path, PathParam } from 'typescript-rest';
import { Test } from '../models/Test';

/**
 * Testing Controller 
 */
@Path('/test')
export class TestController {

    /**
     * @api {get} /test Get All Tests
     * @apiName GetTests
     * @apiGroup Test
     *
     * @apiSuccess {Number} id ID of Test entry.
     * @apiSuccess {String} value Value of Test entry.
     * @apiSuccess {String} createdAt DateTime of creation.
     * @apiSuccess {String} updatedAt DateTime of laste update.
     */
    @GET
    async getTests(): Promise<Test[]> {
        return await Test.findAll();
    }
    
    /**
     * @api {get} /test:id Get Test
     * @apiName GetTest
     * @apiGroup Test
     *
     * @apiParam {String} id ID of Test entry.
     *
     * @apiSuccess {Number} id ID of Test entry.
     * @apiSuccess {String} value Value of Test entry.
     * @apiSuccess {String} createdAt DateTime of creation.
     * @apiSuccess {String} updatedAt DateTime of laste update.
     */
    @Path(':id')
    @GET
    async getTest(@PathParam('id') id: number): Promise<Test> {
        return await Test.findById(id);
    }

    /**
     * @api {post} /test Create Test
     * @apiName PostTest
     * @apiGroup Test
     *
     * @apiParam {String} value Value of new Test entry.
     *
     * @apiSuccess {Number} id ID of Test entry.
     * @apiSuccess {String} value Value of Test entry.
     * @apiSuccess {String} createdAt DateTime of creation.
     * @apiSuccess {String} updatedAt DateTime of laste update.
     */
    @POST
    async postTest(test: Test): Promise<Test> {
        return await Test.build(test).save();
    }

    /**
     * @api {put} /test:id Replace Test
     * @apiName PutTest
     * @apiGroup Test
     *
     * @apiParam {String} id ID of previous Test entry.
     * @apiParam {String} value Update value for Test entry.
     *
     * @apiSuccess {Number} id ID of Test entry.
     * @apiSuccess {String} value Value of Test entry.
     * @apiSuccess {String} createdAt DateTime of creation.
     * @apiSuccess {String} updatedAt DateTime of laste update.
     */
    @Path(':id')
    @PUT
    async putTest(@PathParam('id') id: number, test: Test): Promise<Test> {
        let oldTest = await Test.findById(id);
        return await oldTest.update(test);
    }

    /**
     * @api {patch} /test:id Edit Test
     * @apiName PatchTest
     * @apiGroup Test
     *
     * @apiParam {String} id ID of previous Test entry.
     * @apiParam {String} value Update value for Test entry.
     *
     * @apiSuccess {Number} id ID of Test entry.
     * @apiSuccess {String} value Value of Test entry.
     * @apiSuccess {String} createdAt DateTime of creation.
     * @apiSuccess {String} updatedAt DateTime of laste update.
     */
    @Path(':id')
    @PATCH
    async patchTest(@PathParam('id') id: number, test: Test): Promise<Test> {
        let oldTest = await Test.findById(id);
        return await oldTest.update(test);
    }

    /**
     * @api {delete} /test:id Delete Test
     * @apiName DeleteTest
     * @apiGroup Test
     *
     * @apiParam {String} id ID of previous Test entry.
     */
    @Path(':id')
    @DELETE
    async deleteTest(@PathParam('id') id: number): Promise<void> {
        let test = await Test.findById(id);
        return await test.destroy();
    }
}
