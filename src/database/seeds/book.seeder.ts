import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Book } from "../../modules/books/domain/entities/book.entity";
import bookMock from "../../common/mock/book.mock";

export default class BookSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const repository = dataSource.getRepository(Book)

        await repository.insert(bookMock)
    }
}