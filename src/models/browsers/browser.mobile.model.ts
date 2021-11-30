import { modelOptions, prop } from '@typegoose/typegoose';
import { getUnixDate } from 'src/utils/helpers';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class MobileBrowser {

    /**
     * Code name of the browser
     */
    @prop({
        type: () => String,
        required: true
    })
    public codeName !: string;

    @prop({
        type: () => String,
        required: true
    })
    public device !: string;

    @prop({
        required: true
    })
    public version !: number | string;

    @prop({
        type: () => Number,
        min: 0,
        max: 1000,
        required: true
    })
    public width !: number;

    @prop({
        type: () => Number,
        min: 0,
        max: 2000,
        required: true
    })
    public height !: number;

    @prop({
        type: () => Number,
        min: 0,
        max: 5,
        required: true
    })
    public pixelRatio !: number;

    @prop({
        type: () => String,
        maxlength: 100,
        required: true
    })
    public userAgent !: string;

    /**
     * When was this user created?
     */
     @prop({
        type: () => Number,
        default: getUnixDate()
    })
    public createdOn !: number;

  
}