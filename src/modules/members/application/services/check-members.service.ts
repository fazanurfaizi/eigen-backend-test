import { Injectable } from "@nestjs/common";
import { MemberRepository } from "../../domain/repositories/member.repository";
import { MemberDto } from "../dto/member.dto";

@Injectable()
export class CheckMembersService {
    constructor(
        private readonly memberRepository: MemberRepository
    ) {}

    /**
     * @TODO
     *  Must create DTO for merge member data with number of borrowed books
     *  For now, return all members first
     */    
    async handle(): Promise<MemberDto[]> {
        return await this.memberRepository.findAllWithBorrowedCount()
    }
}