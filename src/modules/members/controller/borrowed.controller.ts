import { Controller, Param, ParseIntPipe, Put, Post, Body } from "@nestjs/common";
import { BorrowBookService } from "../application/services/borrow-book.service";
import { ReturnBookService } from "../application/services/return-book.service";
import { BorrowedDto, RequestBorrowedDto, RequestReturnDto } from "../application/dto/borrowed.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('borrowed')
@Controller('members/:memberId')
export class BorrowedController {
    constructor(
        private readonly borrowBookService: BorrowBookService,
        private readonly returnBookService: ReturnBookService,
    ) {}

    @Post('/borrow')
    @ApiOperation({ summary: 'Borrow specific book' })
    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: BorrowedDto,
    })
    async borrowBook(
        @Param('memberId', ParseIntPipe) memberId: number,
        @Body() requestBorrowedDto: RequestBorrowedDto
    ): Promise<BorrowedDto> {
        return this.borrowBookService.handle(memberId, requestBorrowedDto);
    }

    @Put('/return')
    @ApiOperation({ summary: 'Return specific book' })
    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: BorrowedDto,
    })
    async returnBook(
        @Param('memberId', ParseIntPipe) memberId: number,
        @Body() requestBorrowedDto: RequestReturnDto
    ): Promise<BorrowedDto> {
        return this.returnBookService.handle(memberId, requestBorrowedDto)
    }
}