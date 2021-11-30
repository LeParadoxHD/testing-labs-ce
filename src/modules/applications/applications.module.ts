import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Application } from 'src/models';
import { ApplicationsController } from './applications.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
        Application
    ])
  ],
  controllers: [
    ApplicationsController
  ]
})
export class ApplicationsModule {}