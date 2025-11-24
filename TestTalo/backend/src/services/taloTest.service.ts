import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { user } from "../entities/user.entity";
import { FetchModuleOptions, FetchService } from "nestjs-fetch";

@Injectable()
export class taloTestService {
    constructor(
        @InjectRepository(user)
        private taloTestRepository: Repository<user>,
        private readonly fetch: FetchService
    ) { }

    readAllUser(): Promise<user[]> {
        return this.taloTestRepository.find();
    }

    createOrUpdateUser(newUser: user): Promise<user> {
        return this.taloTestRepository.save(newUser);
    }

    readByUserId(userId: number): Promise<user> {
        return this.taloTestRepository.findOneBy({ userId });
    }

    deleteByUserId(userId: number): Promise<DeleteResult> {
        return this.taloTestRepository.delete({ userId });
    }

    async getProductCatalog(): Promise<any> {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 854c47c63260744287a08cf2434589ae8228b63ecb9d760c988fc61dc469cc55");

        const fetchOptions: FetchModuleOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
        const response = await this.fetch.get('https://meiliqa.talo.cl/indexes/maestra/search?q=&sort=name%3Aasc', fetchOptions);
		return response.json();
    }
}