import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BookDto, CreateBookDto } from "../dto/book.dto";
import { Book } from "../../domain/entities/book.entity";

@Injectable()
export class CreateBookService {
    constructor (
        private readonly bookRepository: BookRepository,
    ) {}

    async handle(createBookDto: CreateBookDto): Promise<BookDto> {
        const book: Book = new Book()
        book.code = createBookDto.code
        book.title = createBookDto.title
        book.author = createBookDto.author
        book.stock = createBookDto.stock
        await this.bookRepository.save(book)

        return {
            id: book.id,
            code: book.code,
            title: book.title,
            author: book.author,
            stock: book.stock
        }
    }
}