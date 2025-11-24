import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FetchModule } from "nestjs-fetch";
import { taloTestController } from "./controllers/taloTest.controller";

import { user } from "./entities/user.entity";
import { taloTestService } from "./services/taloTest.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([user]),
        FetchModule
    ],
    providers:[taloTestService],
    controllers:[taloTestController]
})
export class taloTestModule{}