import { IsDate, IsNumber, IsObject } from "class-validator";
import { MemberDto } from "./member.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BookDto } from "../../../books/application/dto/book.dto";

export class BorrowedDto {
    @IsDate()
    @ApiProperty({ example: '2024-07-12 01:00:00', description: 'The borrowed At of the Book' })
    borrowedAt: Date

    @IsDate({ always: false })
    @ApiProperty({ example: '2024-07-12 01:00:00', description: 'The returned At of the Book' })
    returnedAt?: Date

    @IsObject()
    @ApiProperty({ type: MemberDto, description: 'The returned At of the Book' })
    member: MemberDto

    @IsObject()
    @ApiProperty({ type: BookDto, description: 'The returned At of the Book' })
    book: BookDto
}

export class RequestBorrowedDto {
    @IsNumber()
    @ApiProperty({ example: 0, description: 'The Book Id for borrowed' })
    bookId: number
}

export class RequestReturnDto {
    @IsNumber()
    @ApiProperty({ example: 0, description: 'The Book Id for returned' })
    bookId: number
}