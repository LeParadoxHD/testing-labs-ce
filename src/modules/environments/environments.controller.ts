import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Environment } from 'src/models';
import { GenericRestApi } from '../generic/generic-item.controller';
import { Cache } from 'cache-manager';

@Controller('environments')
export class EnvironmentsController extends GenericRestApi<Environment> {
    
    constructor(
      @InjectModel(Environment) protected readonly itemModel: ReturnModelType<typeof Environment>,
      @Inject(CACHE_MANAGER) protected cache: Cache
    ) {
        super();
    }
}
