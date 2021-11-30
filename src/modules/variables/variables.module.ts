import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Variable } from 'src/models';
import { VariablesController } from './variables.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
        Variable
    ])
  ],
  controllers: [
    VariablesController
  ]
})
export class VariablesModule {}