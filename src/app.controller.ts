import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Student } from 'libs/db/models/student.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

async function initStudentData(model: ReturnModelType<typeof Student>) {
  const data = readFileSync('student.csv').toString();
  const rows = data.split('\r\n');
  for (let i = 1; i < rows.length; ++i) {
    const columns = rows[i].split('\t');
    const name = columns[0];
    const pass = columns[1];
    const found = await model.findOne({ name: name, password: pass });
    if (!found) {
      const uuid = uuidv4();
      console.log(`create student name: ${name}, pass: ${pass}, uuid: ${uuid}, data: ${data}`);
      await model.create({ name: name, password: pass, data: [], uuid: uuid });
    } else {
      console.log(`found student _id: ${found._id}, name: ${found.name}, pass: ${found.password}, uuid: ${found.uuid}, data: ${found.data}`);
    }
  }
}

class LoginDto {
  name: string;
  password: string;
};

class CheckDto {
  _id: string;
  uuid: string;
};

@Controller()
export class AppController {
  constructor(@InjectModel(Student) private readonly model: ReturnModelType<typeof Student>) {
    initStudentData(this.model);
  }

  @Put('login')
  async login(@Body() body: LoginDto) {
    const found = await this.model.findOne({ name: body.name, password: body.password });
    if (!found) {
      return {
        success: false,
        data: {},
        message: "no such user"
      };
    }
    found.uuid = uuidv4();
    await this.model.findByIdAndUpdate(found._id, found);
    return {
      success: true,
      data: {
        _id: found._id,
        uuid: found.uuid,
      },
      message: "login success"
    };
  }

  @Post('check')
  async check(@Body() body: CheckDto) {
    const found = await this.model.findOne({ _id: body._id, uuid: body.uuid });
    return found ? true : false;
  }

  @Get()
  getHello(): string {
    return "Hello World!";
  }
}
