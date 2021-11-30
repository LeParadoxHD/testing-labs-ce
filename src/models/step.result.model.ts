import { modelOptions, prop } from "@typegoose/typegoose";
import { getUnixDate } from "src/utils/helpers";

/**
 * Contains the result information of
 * each step executed for a Test
 */
@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class StepResult {

    /**
     * Name/Text of this StepResult
     * Example: I can go to URL "x"
     */
    @prop({
        type: () => String,
        trim: true,
        required: true
    })
    public name !: string;

    /**
     * How much time did the step take (in milliseconds).
     */
     @prop({
        type: () => Number,
        default: 0
    })
    public executionTime !: number;

    /**
     * Whether or not the step was successful or not
     */
    @prop({
        type: () => Boolean,
        default: false
    })
    public success !: boolean;

    /**
     * Contains the relative URL to the screenshot
     * saved after the completion of this step.
     * Returns null if the step wasn't marked to do a screenshot
     */
    @prop({
        default: null
    })
    public screenshot: string;

    /** 
     * Datetime when the Step completed
     */
     @prop({
        type: () => Number
    })
    public datetime !: number;

    /**
     * Helps to update the datetime
     */
    public updateDateTime() {
        this.datetime = getUnixDate();
    }
}