import { Injectable } from "@nestjs/common";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { MemberDto } from "../dto/member.dto";

@Injectable()
export class FindMemberService {
    constructor (
        private readonly memberRepository: MemberRepository,
    ) {}

    async handle(id: number): Promise<MemberDto> {
        const book = await this.memberRepository.findById(id)

        return {
            id: book.id,
            code: book.code,
            name: book.name,
        }
    }
}