import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsController } from './sns/sns.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, SnsController],
  providers: [AppService],
})
export class AppModule {}
