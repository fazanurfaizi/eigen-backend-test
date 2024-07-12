import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BookDto } from "../dto/book.dto";

@Injectable()
export class FindAllBookService {
    constructor (
        private readonly bookRepository: BookRepository,
    ) {}

    async handle(): Promise<BookDto[]> {
        const books = await this.bookRepository.findAll()

        const bookDtos: BookDto[] = books.map((book) => ({
            id: book.id,
            code: book.code,
            title: book.title,
            author: book.author,
            stock: book.stock,
        }))

        return bookDtos
    }
}