import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Application } from 'src/models';
import { GenericRestApi } from '../generic/generic-item.controller';
import { Cache } from 'cache-manager';

@Controller('applications')
export class ApplicationsController extends GenericRestApi<Application> {
    
    constructor(
      @InjectModel(Application) protected readonly itemModel: ReturnModelType<typeof Application>,
      @Inject(CACHE_MANAGER) protected cache: Cache
    ) {
        super();
    }
}
