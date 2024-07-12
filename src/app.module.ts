import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './common/config/ormconfig'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './modules/members/member.module';
import { BookModule } from './modules/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    BookModule,
    MemberModule
  ],
})
export class AppModule {}
