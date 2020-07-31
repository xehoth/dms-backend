import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Student } from './models/student.model';

const models = TypegooseModule.forFeature([Student]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        };
      }
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
