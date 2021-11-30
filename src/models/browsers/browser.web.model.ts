import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class WebBrowser {

    /**
     * Code name of the browser
     */
    @prop({
        type: () => String,
        required: true
    })
    public codeName !: string;
    
    /**
     * Version of the browser
     * Examples:
     *  - 96
     *  - 96.1
     */
    @prop({
        required: true
    })
    public version !: number | string;
  
}