import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CheckMembersService } from "../application/services/check-members.service";
import { CreateMemberDto, MemberDto, MemberQueryDto, UpdateMemberDto } from "../application/dto/member.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FindAllMemberService } from "../application/services/find-all-member.service";
import { FindMemberService } from "../application/services/find-member.service";
import { CreateMemberService } from "../application/services/create-member.service";
import { UpdateMemberService } from "../application/services/update-book.service";
import { DestroyMemberService } from "../application/services/destroy-member.service";

@ApiTags('members')
@Controller('members')
export class MemberController {
    constructor(
        private readonly checkMemberService: CheckMembersService,
        private readonly findAllMemberService: FindAllMemberService,
        private readonly findMemberService: FindMemberService,
        private readonly createMemberService: CreateMemberService,
        private readonly updateMemberService: UpdateMemberService,
        private readonly destroyMemberService: DestroyMemberService,
    ) {}

    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: MemberDto,
        isArray: true
    })
    @ApiOperation({ summary: 'Shows all existing members' })
    @Get('')
    async findAll(
        @Query() query: MemberQueryDto
    ): Promise<MemberDto[]> {
        if (query.withCount == true) return this.checkMemberService.handle();
        else return this.findAllMemberService.handle();
    }

    @ApiOkResponse({
        status: 200,
        description: 'Found data',
        type: MemberDto,
    })
    @ApiOperation({ summary: 'Shows specific existing member' })
    @Get(':id')
    async find(
        @Param('id', ParseIntPipe) id: number
    ): Promise<MemberDto|null> {
        return this.findMemberService.handle(id);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Create data',
        type: MemberDto,
    })
    @ApiOperation({ summary: 'create a new member' })
    @Post('')
    async create(
        @Body() createMemberDto: CreateMemberDto
    ): Promise<MemberDto> {
        return this.createMemberService.handle(createMemberDto);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Update data',
        type: MemberDto,
    })
    @ApiOperation({ summary: 'update an existing member' })
    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMemberDto: UpdateMemberDto
    ): Promise<MemberDto|null> {
        return this.updateMemberService.handle(id, updateMemberDto);
    }

    @ApiOkResponse({
        status: 200,
        description: 'Delete data',
        type: MemberDto,
    })
    @ApiOperation({ summary: 'delete an existing member' })
    @Delete(':id')
    async destroy(
        @Param('id', ParseIntPipe) id: number
    ): Promise<MemberDto|null> {
        return this.destroyMemberService.handle(id);
    } 
}