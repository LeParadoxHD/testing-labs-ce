import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";
import { Account } from "src/models";
import { Cache } from 'cache-manager';
import { safeUser } from "src/utils/helpers";

@Injectable()
export class AccountService {

    constructor(
        @InjectModel(Account) protected readonly accountModel: ReturnModelType<typeof Account>,
        @Inject(CACHE_MANAGER) private cache: Cache
    ) { }

    async resolveAccount(id: string) {
        const account = await this.accountModel.findById(id).exec();
        if (account) {
            await this.cache.set(`account_${account._id}`, safeUser(account))
            return account;
        } else {
            throw new HttpException({
                success: false,
                error: 'Unable to resolve userId'
            }, HttpStatus.EXPECTATION_FAILED)
        }
    }

}