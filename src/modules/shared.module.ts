import { CacheModule, Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Account } from 'src/models';
import { AccountService } from '../services/account.service';
import { ConfigService } from '../services/config.service';
import { EncryptionService } from '../services/encryption.service';
import type { ClientOpts as RedisClientOpts } from 'redis'
import * as redisStore from 'cache-manager-redis-store';
import { LoggerService } from 'src/services/logger.service';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
    imports: [
        TypegooseModule.forFeature([
            Account
        ]),
        CacheModule.register<RedisClientOpts>({
          store: redisStore,
          host: 'localhost',
          port: 6379
        }),
        ScheduleModule.forRoot()
    ],
    providers: [
        EncryptionService,
        ConfigService,
        AccountService,
        LoggerService
    ],
    exports: [
        EncryptionService,
        ConfigService,
        TypegooseModule,
        AccountService,
        CacheModule,
        LoggerService,
        ScheduleModule
    ]
})
export class SharedModule {}