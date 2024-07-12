import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { BookRepository } from "../../../books/domain/repositories/book.repository";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { BorrowedRepository } from "../../domain/repositories/borrowed.repository";
import { Borrowed } from "../../domain/entities/borrowed.entity";
import { BorrowedDto, RequestBorrowedDto } from "../dto/borrowed.dto";

@Injectable()
export class BorrowBookService {
    constructor (
        private readonly bookRepository: BookRepository,
        private readonly memberRepository: MemberRepository,
        private readonly borrowedRepository: BorrowedRepository,
    ) {}

    async handle(memberId: number, requestBorrowedDto: RequestBorrowedDto): Promise<BorrowedDto> {
        const member = await this.memberRepository.findById(memberId)
        const book = await this.bookRepository.findById(requestBorrowedDto.bookId)
        
        if (!book) throw new NotFoundException('Book is not found')

        if (member.isPenalized()) {
            throw new ForbiddenException('Member is currently penalized')
        }

        if (book.stock == 0) {
            throw new BadRequestException('Book is of out stock')
        }

        const checkMemberBorrowedStatus = await this.borrowedRepository.findAllMemberBorrowedBooks(memberId)
        if (checkMemberBorrowedStatus.length == 2) {
            throw new ForbiddenException('Member is already borrowed 2 books')
        }

        const checkBookBorrowedStatus = await this.borrowedRepository.checkBookBorrowedStatus(book.id)
        if (checkBookBorrowedStatus) {
            throw new BadRequestException('Book is already borrowed')
        }        

        const borrowed = new Borrowed()
        borrowed.member = member
        borrowed.book = book
        borrowed.borrowedAt = new Date()
        borrowed.returnedAt = null
        await this.borrowedRepository.save(borrowed)

        member.penaltyEndDate = null
        await this.memberRepository.update(memberId, member)

        book.stock = book.stock - 1
        await this.bookRepository.update(book.id, book)

        const result: BorrowedDto = {
            member: {
                code: member.code,
                name: member.name
            },
            book: {
                code: book.code,
                title: book.title,
                author: book.author
            },
            borrowedAt: borrowed.borrowedAt
        }

        return result
    }
}