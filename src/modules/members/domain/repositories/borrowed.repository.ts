import { InjectRepository } from "@nestjs/typeorm";
import { Borrowed } from "../entities/borrowed.entity";
import { IsNull, Not, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BorrowedRepository {
    constructor (
        @InjectRepository(Borrowed) private readonly borrowedRepository: Repository<Borrowed>
    ) {}

    async save(borrowed: Borrowed): Promise<void> {
        await this.borrowedRepository.save(borrowed)
    }

    async update(id: number, borrowed: Borrowed): Promise<void> {
        await this.borrowedRepository.update({ id: id }, borrowed)
    }

    async findByMemberAndBook(memberId: number, bookId: number): Promise<Borrowed> {
        return await this.borrowedRepository.findOne({
            where: {
                member: { id: memberId },
                book: { id: bookId },
                returnedAt: IsNull()
            },
            relations: ['member', 'book']
        })
    }

    async findAllMemberBorrowedBooks(memberId: number): Promise<Borrowed[]> {
        return await this.borrowedRepository.find({
            where: {
                member: {
                    id: memberId
                },                
                returnedAt: IsNull()
            },
        })
    }

    async checkBookBorrowedStatus(bookId: number): Promise<Borrowed|null> {
        return await this.borrowedRepository.findOne({
            where: {
                book: {
                    id: bookId
                },
                returnedAt: IsNull()
            }
        })
    }

    async getMemberBorrowedBooks(memberId: number): Promise<Borrowed[]> {
        return await this.borrowedRepository.createQueryBuilder('borrowed')
            .leftJoinAndSelect('borrowed.book', 'book')
            .where('borrowed.memberId = :memberId', { memberId: memberId })
            .where('borrowed.returnedAt IS NULL')
            .getMany();
    }
}