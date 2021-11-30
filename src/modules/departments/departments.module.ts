import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Department } from 'src/models';
import { DepartmentsController } from './departments.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      Department
    ])
  ],
  controllers: [
    DepartmentsController
  ]
})
export class DepartmentsModule {}