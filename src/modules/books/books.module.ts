import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./domain/entities/book.entity";
import { BookRepository } from "./domain/repositories/book.repository";
import { CheckBooksService } from "./application/services/check-books.service";
import { MemberModule } from "../members/member.module";
import { BookController } from "./controller/book.controller";
import { CreateBookService } from "./application/services/create-book.service";
import { FindAllBookService } from "./application/services/find-all-book.service";
import { FindBookService } from "./application/services/find-book.service";
import { UpdateBookService } from "./application/services/update-book.service";
import { DestroyBookService } from "./application/services/destroy-book.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),  
        forwardRef(() => MemberModule)      
    ],
    providers: [
        BookRepository,
        FindAllBookService,
        FindBookService,
        CreateBookService,
        UpdateBookService,
        DestroyBookService,
        CheckBooksService,
    ],
    controllers: [BookController],
    exports: [BookRepository]
})
export class BookModule {}