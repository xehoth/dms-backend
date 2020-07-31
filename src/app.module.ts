import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from 'libs/common';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
