import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BookDto {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'The id of the Book' })
    id?: number

    @IsString()
    @ApiProperty({ example: 'JK-45', description: 'The code of the Book' })
    code: string

    @IsString()
    @ApiProperty({ example: 'Harry Potter', description: 'The title of the Book' })
    title: string

    @IsString()
    @ApiProperty({ example: 'J.K Rowling', description: 'The author of the Book' })
    author: string

    @IsNumber()
    @ApiProperty({ example: 1, description: 'The stock of the Book' })
    stock?: number

    @IsBoolean()
    @ApiProperty({ example: false, description: 'Shows whether the book is borrowed or not' })
    isBorrowed?: boolean
}

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'JK-45', description: 'The code of the Book' })
    code: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Harry Potter', description: 'The title of the Book' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'J.K Rowling', description: 'The author of the Book' })
    author: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'The stock of the Book' })
    stock: number;
}

export class UpdateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Harry Potter', description: 'The title of the Book' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'J.K Rowling', description: 'The author of the Book' })
    author: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'The stock of the Book' })
    stock: number;
}