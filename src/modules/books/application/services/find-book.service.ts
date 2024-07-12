import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BookDto } from "../dto/book.dto";

@Injectable()
export class FindBookService {
    constructor (
        private readonly bookRepository: BookRepository,
    ) {}

    async handle(id: number): Promise<BookDto> {
        const book = await this.bookRepository.findById(id)

        return {
            id: book.id,
            code: book.code,
            title: book.title,
            author: book.author,
            stock: book.stock,
        }
    }
}