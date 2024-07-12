import { Injectable } from "@nestjs/common";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { CreateMemberDto, MemberDto } from "../dto/member.dto";
import { Member } from "../../domain/entities/member.entity";

@Injectable()
export class CreateMemberService {
    constructor (
        private readonly memberRepository: MemberRepository,
    ) {}

    async handle(createMemberDto: CreateMemberDto): Promise<MemberDto> {
        const book: Member = new Member()
        book.code = createMemberDto.code
        book.name = createMemberDto.name        
        await this.memberRepository.save(book)

        return {
            id: book.id,
            code: book.code,
            name: book.name,            
        }
    }
}