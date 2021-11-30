import { prop, modelOptions, index, Ref } from "@typegoose/typegoose";
import { variableRegex } from "src/utils/regex";

export enum VariableScope {
    Global = 'global',
    Environment = 'environment',
    Department = 'department',
    Application = 'application',
    Test = 'test'
}

/**
 * Platform Variables used system wide
 */
@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
@index({ scope: 1, name: 1, which: 1, scopeItem: 1 }, { unique: true })
export class Variable {

    /**
     * Name/ID of the variable
     * Can only contain alphanumeric characters and underscores
     */
    @prop({
        type: () => String,
        validate: variableRegex,
        trim: true,
        required: true,
        minlength: 3
    })
    public name !: string;

    /**
     * Variable value
     * (self-explanatory)
     */
    @prop({
        type: () => String,
        required: true
    })
    public value !: string;

    /**
     * Whether or not the variable value is encrypted
     */
    @prop({
        type: () => Boolean,
        required: true
    })
    public encrypted !: boolean;

}