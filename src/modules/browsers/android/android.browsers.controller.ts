import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AndroidBrowser } from 'src/models';
import { Cache } from 'cache-manager';
import { GenericRestApi } from 'src/modules/generic/generic-item.controller';

@Controller('browsers/android')
export class AndroidBrowsersController extends GenericRestApi<AndroidBrowser> {
    
    constructor(
      @InjectModel(AndroidBrowser) protected readonly itemModel: ReturnModelType<typeof AndroidBrowser>,
      @Inject(CACHE_MANAGER) protected cache: Cache
    ) {
        super();
    }
}
