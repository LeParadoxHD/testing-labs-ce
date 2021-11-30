import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Department } from 'src/models';
import { GenericRestApi } from '../generic/generic-item.controller';
import { Cache } from 'cache-manager';

@Controller('departments')
export class DepartmentsController extends GenericRestApi<Department> {
    
    constructor(
      @InjectModel(Department) protected readonly itemModel: ReturnModelType<typeof Department>,
      @Inject(CACHE_MANAGER) protected cache: Cache
    ) {
        super();
    }
}
