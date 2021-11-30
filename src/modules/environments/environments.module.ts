import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Environment } from 'src/models';
import { EnvironmentsController } from './environments.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
        Environment
    ])
  ],
  controllers: [
    EnvironmentsController
  ]
})
export class EnvironmentsModule {}