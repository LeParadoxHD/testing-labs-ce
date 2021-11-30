import { modelOptions, prop } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { getUnixDate } from 'src/utils/helpers';
import { Variable } from 'src/utils/interfaces';
import { nameRegex } from 'src/utils/regex';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class Department {

    /**
     * Name of the department
     */
    @prop({
        type: () => String,
        validate: nameRegex,
        required: true,
        maxlength: 50
    })
    public name !: string;

    /**
     * Array of variables tied to this scope
     */
    @prop({
        type: () => [Object],
        default: []
    }, WhatIsIt.ARRAY)
    public variables?: Variable[];

    /**
     * When was this department created?
     */
    @prop({
        type: () => Number,
        default: getUnixDate()
    })
    public createdOn !: number;
  
}