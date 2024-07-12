import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./domain/entities/member.entity";
import { CheckMembersService } from "./application/services/check-members.service";
import { MemberController } from "./controller/member.controller";
import { BorrowBookService } from "./application/services/borrow-book.service";
import { Borrowed } from "./domain/entities/borrowed.entity";
import { BookModule } from "../books/books.module";
import { BorrowedController } from "./controller/borrowed.controller";
import { ReturnBookService } from "./application/services/return-book.service";
import { MemberRepository } from "./domain/repositories/member.repository";
import { BorrowedRepository } from "./domain/repositories/borrowed.repository";
import { FindAllMemberService } from "./application/services/find-all-member.service";
import { FindMemberService } from "./application/services/find-member.service";
import { CreateMemberService } from "./application/services/create-member.service";
import { DestroyMemberService } from "./application/services/destroy-member.service";
import { UpdateMemberService } from "./application/services/update-book.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Member, Borrowed]),
        forwardRef(() => BookModule),
    ],
    providers: [
        MemberRepository,
        BorrowedRepository,
        FindAllMemberService,
        FindMemberService,
        CreateMemberService,
        UpdateMemberService,
        DestroyMemberService,
        CheckMembersService,
        BorrowBookService,
        ReturnBookService,
    ],
    controllers: [
        MemberController,
        BorrowedController,
    ],
    exports: [
        BorrowedRepository
    ]
})
export class MemberModule {}