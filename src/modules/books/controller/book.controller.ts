import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CheckBooksService } from '../application/services/check-books.service';
import { BookDto, CreateBookDto, UpdateBookDto } from '../application/dto/book.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookService } from '../application/services/create-book.service';
import { FindAllBookService } from '../application/services/find-all-book.service';
import { FindBookService } from '../application/services/find-book.service';
import { UpdateBookService } from '../application/services/update-book.service';
import { DestroyBookService } from '../application/services/destroy-book.service';

@ApiTags('books')
@Controller('books')
export class BookController {
    constructor(
        private readonly checkBooksService: CheckBooksService,
        private readonly findAllBookService: FindAllBookService,
        private readonly findBookService: FindBookService,
        private readonly createBookService: CreateBookService,
        private readonly updateBookService: UpdateBookService,
        private readonly destroyBookService: DestroyBookService,
    ) {}

    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: BookDto,
        isArray: true
    })
    @ApiOperation({ summary: 'Shows all existing books' })
    @Get('')
    async findAll(): Promise<BookDto[]> {
        return this.findAllBookService.handle();
    }

    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: BookDto,
    })
    @ApiOperation({ summary: 'Shows specific existing book' })
    @Get(':id')
    async find(
        @Param('id', ParseIntPipe) id: number
    ): Promise<BookDto|null> {
        return this.findBookService.handle(id);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Create data',
        type: BookDto,
    })
    @ApiOperation({ summary: 'create a new book' })
    @Post('')
    async create(
        @Body() createBookDto: CreateBookDto
    ): Promise<BookDto> {
        return this.createBookService.handle(createBookDto);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Update data',
        type: BookDto,
    })
    @ApiOperation({ summary: 'update an existing book' })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto: UpdateBookDto
    ): Promise<BookDto|null> {
        return this.updateBookService.handle(id, updateBookDto);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Delete data',
        type: BookDto,
    })
    @ApiOperation({ summary: 'delete an existing book' })
    @Delete(':id')
    async destroy(
        @Param('id', ParseIntPipe) id: number
    ): Promise<BookDto|null> {
        return this.destroyBookService.handle(id);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: BookDto,
        isArray: true
    })
    @ApiOperation({ summary: 'shows all books that have not been borrowed by a particular member' })
    @Get(':memberId/borrows')
    async checkBooks(
        @Param('memberId', ParseIntPipe) memberId: number
    ): Promise<BookDto[]> {
        return this.checkBooksService.handle(memberId);
    }
}