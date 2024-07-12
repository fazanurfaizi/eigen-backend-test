import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../entities/book.entity";

export class BookRepository {
    constructor (
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,    
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find()
    }

    async findById(id: number): Promise<Book|null> {        
        return await this.bookRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async save(book: Book): Promise<Book> {
        return await this.bookRepository.save(book)
    }

    async update(id: number, book: Book): Promise<Book> {
        await this.bookRepository.update({ id: id }, book)
        return await this.bookRepository.findOne({ where: { id: id } })
    }

    async delete(id: number): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id: id } })
        await this.bookRepository.delete({ id: id })
        return book
    }
}