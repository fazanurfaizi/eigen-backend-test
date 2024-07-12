import { BadRequestException, Injectable } from "@nestjs/common";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { BookRepository } from "../../../books/domain/repositories/book.repository";
import { BorrowedRepository } from "../../domain/repositories/borrowed.repository";
import { BorrowedDto, RequestReturnDto } from "../dto/borrowed.dto";

@Injectable()
export class ReturnBookService {
    constructor (
        private readonly memberRepository: MemberRepository,
        private readonly bookRepository: BookRepository,
        private readonly borrowedRepository: BorrowedRepository,
    ) {}

    async handle(memberId: number, requestBorrowedDto: RequestReturnDto): Promise<BorrowedDto> {
        const borrowedBook = await this.borrowedRepository.findByMemberAndBook(memberId, requestBorrowedDto.bookId)

        if (!borrowedBook) {
            throw new BadRequestException('Book not borrowed by this member.')
        }

        borrowedBook.returnedAt = new Date()
        
        const borrowedAt = new Date(borrowedBook.borrowedAt)
        const oneDay = 24 * 60 * 60 * 100
        const daysBorrowed = Math.floor((new Date().getTime() - borrowedAt.getTime()) / oneDay)

        if (daysBorrowed > 7) {
            const penaltyDay = 3 * 24 * 60 * 60 * 100
            borrowedBook.member.penaltyEndDate = new Date(new Date().getTime () + penaltyDay)
        }

        borrowedBook.book.stock = borrowedBook.book.stock + 1

        await this.borrowedRepository.save(borrowedBook)
        await this.memberRepository.update(borrowedBook.book.id, borrowedBook.member)        
        await this.bookRepository.update(borrowedBook.book.id, borrowedBook.book)

        const result: BorrowedDto = {
            member: {
                code: borrowedBook.member.code,
                name: borrowedBook.member.name,
                penaltyEndDate: borrowedBook.member.penaltyEndDate
            },
            book: {
                code: borrowedBook.book.code,
                title: borrowedBook.book.title,
                author: borrowedBook.book.author
            },
            borrowedAt: borrowedBook.borrowedAt,
            returnedAt: borrowedBook.returnedAt
        }

        return result
    }
}