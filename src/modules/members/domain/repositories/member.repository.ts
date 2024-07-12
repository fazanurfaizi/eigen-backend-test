import { InjectRepository } from "@nestjs/typeorm";
import { Member } from "../entities/member.entity";
import { Repository } from "typeorm";
import { MemberDto } from "../../application/dto/member.dto";

export class MemberRepository {
    constructor(
        @InjectRepository(Member) private readonly memberRepository: Repository<Member>
    ) {}

    async findAll(): Promise<Member[]> {
        return this.memberRepository.find()
    }

    async findById(id: number): Promise<Member|null> {
        return this.memberRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async update(id: number, member: Member): Promise<Member> {
        await this.memberRepository.update({ id: id }, member)
        return await this.memberRepository.findOne({ where: { id: id } })
    }

    async save(member: Member): Promise<Member> {
        return await this.memberRepository.save(member)
    }

    async delete(id: number): Promise<Member> {
        const member = await this.memberRepository.findOne({ where: { id: id } })
        await this.memberRepository.delete({ id: id })
        return member
    }

    async findAllWithBorrowedCount(): Promise<MemberDto[]> {
        const membersWithBorrowedCount = await this.memberRepository.createQueryBuilder('member')
            .leftJoinAndSelect('member.borrowedBooks', 'borrowedBooks')
            .loadRelationCountAndMap('member.borrowedBooksCount', 'member.borrowedBooks', 'borrowedBooksCount', qb =>
                qb.andWhere('borrowedBooksCount.returned_at IS NULL')
            )
            .getMany();

        return membersWithBorrowedCount.map((member) => ({
            code: member.code,
            name: member.name,
            borrowedBooksCount: member['borrowedBooksCount']
        }))
    }    
}