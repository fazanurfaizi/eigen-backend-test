import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MemberDto {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'The id of the Book' })
    id?: number
    
    @IsString()
    @ApiProperty({ example: 'FZ', description: 'The code of the Member' })
    readonly code: string;

    @IsString()
    @ApiProperty({ example: 'Faza', description: 'The name of the Book' })
    readonly name: string;

    @IsNumber()
    @ApiProperty({ example: 0, description: 'Total number of borrowed books' })
    borrowedBooksCount?: number;

    @IsDate()
    @ApiProperty({ example: '2024-07-12', description: 'Penalty end date' })
    penaltyEndDate?: Date|null;
}

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'FZ', description: 'The code of the Member' })
    code: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Faza', description: 'The name of the Member' })
    name: string;
}

export class UpdateMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Faza', description: 'The name of the Member' })
    name: string;
}

export class MemberQueryDto {
    @IsBoolean()
    @ApiProperty({ name: 'withCount', type: 'boolean', example: false, description: 'Shows the number of books borrowed' })
    @Transform(({ value } ) => 
        value === 'true' || value === true || value === 1 || value === '1'
    )
    withCount?: boolean = false;
}