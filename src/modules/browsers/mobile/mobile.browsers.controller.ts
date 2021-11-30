import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { MobileBrowser } from 'src/models';
import { Cache } from 'cache-manager';
import { GenericRestApi } from 'src/modules/generic/generic-item.controller';

@Controller('browsers/mobile')
export class MobileBrowsersController extends GenericRestApi<MobileBrowser> {
    
    constructor(
      @InjectModel(MobileBrowser) protected readonly itemModel: ReturnModelType<typeof MobileBrowser>,
      @Inject(CACHE_MANAGER) protected cache: Cache
    ) {
        super();
    }
}
