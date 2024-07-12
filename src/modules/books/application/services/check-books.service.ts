import { Injectable } from "@nestjs/common";
import { BookRepository } from "../../domain/repositories/book.repository";
import { BorrowedRepository } from "../../../members/domain/repositories/borrowed.repository";
import { BookDto } from "../dto/book.dto";

@Injectable()
export class CheckBooksService {
    constructor (
        private readonly bookRepository: BookRepository,
        private readonly borrowedRepository: BorrowedRepository
    ) {}

    async handle(memberId: number): Promise<BookDto[]> {
        const books = await this.bookRepository.findAll()

        const borrowedBooks = await this.borrowedRepository.getMemberBorrowedBooks(memberId)

        const borrowedBookIds = borrowedBooks.map((val) => val.book.id)

        const availableBooks = books.filter((book) => !borrowedBookIds.includes(book.id))

        const bookDtos: BookDto[] = availableBooks.map((book) => ({
            id: book.id,
            code: book.code,
            title: book.title,
            author: book.author,
            stock: book.stock,            
        }))

        return bookDtos
    }
}