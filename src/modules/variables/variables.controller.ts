import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Variable } from 'src/models';

@Controller('variables')
export class VariablesController {
    
    constructor(
      @InjectModel(Variable) private readonly variableModel: ReturnModelType<typeof Variable>
    ) { }

    @Get()
    getAll() {
        return this.variableModel.find().exec();
    }

    @Patch()
    async patchOrUpdate(
        @Body() variables: Variable[]
    ) {
        await this.variableModel.deleteMany({}).exec();
        await this.variableModel.insertMany(variables);
    }
}
