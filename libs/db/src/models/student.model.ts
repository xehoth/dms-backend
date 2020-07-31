import { prop, modelOptions, arrayProp } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Student {
  @prop()
  @ApiProperty({ description: 'id' })
  name: string;

  @prop()
  @ApiProperty({ description: 'password' })
  password: string;

  @arrayProp(String)
  @ApiProperty({ description: 'data' })
  data: string[];

  @prop()
  @ApiProperty({ description: 'uuid' })
  uuid: string;
}