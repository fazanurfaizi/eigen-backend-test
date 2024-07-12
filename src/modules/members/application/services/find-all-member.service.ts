import { Injectable } from "@nestjs/common";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { MemberDto } from "../dto/member.dto";

@Injectable()
export class FindAllMemberService {
    constructor (
        private readonly memberRepository: MemberRepository,
    ) {}

    async handle(): Promise<MemberDto[]> {
        const books = await this.memberRepository.findAll()

        const memberDtos: MemberDto[] = books.map((book) => ({
            id: book.id,
            code: book.code,
            name: book.name,
        }))

        return memberDtos
    }
}