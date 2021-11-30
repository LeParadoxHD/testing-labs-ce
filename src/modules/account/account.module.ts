import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';

@Module({
  imports: [

  ],
  controllers: [
    AccountController
  ]
})
export class AccountModule {}