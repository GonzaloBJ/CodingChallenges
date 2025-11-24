import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { user } from "../entities/user.entity";
import { taloTestService } from "../services/taloTest.service";

@Controller('taloTest')
export class taloTestController {
    constructor(private readonly taloTestService: taloTestService) { }

    @Get('/catalog')
    async getProductCatalog(@Res() response) {
        try {
            const catalog = await this.taloTestService.getProductCatalog();
            return response.status(HttpStatus.OK).json({
                catalog
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    @Post('user/create')
    async createUser(@Res() response, @Body() user: user) {
        try {
            const newUser = await this.taloTestService.createOrUpdateUser(user);
            return response.status(HttpStatus.CREATED).json({
                newUser
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    @Get('/user/all')
    async readAllUser(@Res() response) {
        try {
            const users = await this.taloTestService.readAllUser();
            return response.status(HttpStatus.OK).json({
                users
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    @Get('/user/:id')
    async readByUserId(@Res() response, @Param('id') userId) {
        try {
            const user = await this.taloTestService.readByUserId(userId);
            return response.status(HttpStatus.OK).json({
                user
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    @Post('/user/delete')
    async deleteByUserId(@Res() response, @Body() userId: number) {
        try {
            const deletedUser = await this.taloTestService.deleteByUserId(userId);
            return response.status(HttpStatus.OK).json({
                deletedUser
            })
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

}