import { Injectable } from "@nestjs/common";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { MemberDto, UpdateMemberDto } from "../dto/member.dto";
import { Member } from "../../domain/entities/member.entity";

@Injectable()
export class UpdateMemberService {
    constructor (
        private readonly memberRepository: MemberRepository,
    ) {}

    async handle(id: number, updateMemberDto: UpdateMemberDto): Promise<MemberDto> {
        const member: Member = new Member()
        member.name = updateMemberDto.name
        await this.memberRepository.update(id, member)

        return {
            id: member.id,
            code: member.code,
            name: member.name,
        }
    }
}