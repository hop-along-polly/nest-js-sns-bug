import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsController } from './sns/sns.controller';

@Module({
  imports: [],
  controllers: [AppController, SnsController],
  providers: [AppService],
})
export class AppModule {}
