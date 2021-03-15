import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';

@Module({
  imports: [DatabaseModule],
  providers: [ParserService],
  controllers: [ParserController],
  exports: [ParserService],
})
export class ParserModule {}
