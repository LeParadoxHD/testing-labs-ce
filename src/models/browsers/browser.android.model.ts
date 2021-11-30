import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class AndroidBrowser {

    /**
     * Version of Android
     */
    @prop({
        required: true
    })
    public version !: number | string;
  
}