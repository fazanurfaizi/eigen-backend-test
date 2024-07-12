import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import memberMock from "../../common/mock/member.mock";
import { Member } from "../../modules/members/domain/entities/member.entity";

export default class MemberSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const repository = dataSource.getRepository(Member)

        await repository.insert(memberMock)
    }
}