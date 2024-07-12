import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BookDto, UpdateBookDto } from "../dto/book.dto";
import { Book } from "../../domain/entities/book.entity";

@Injectable()
export class UpdateBookService {
    constructor (
        private readonly bookRepository: BookRepository,
    ) {}

    async handle(id: number, updateBookDto: UpdateBookDto): Promise<BookDto> {
        const book: Book = new Book()
        book.title = updateBookDto.title
        book.author = updateBookDto.author
        book.stock = updateBookDto.stock
        await this.bookRepository.update(id, book)

        return {
            id: book.id,
            code: book.code,
            title: book.title,
            author: book.author,
            stock: book.stock
        }
    }
}