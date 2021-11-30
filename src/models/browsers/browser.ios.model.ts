import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
    schemaOptions: {
        versionKey: false   
    }
})
export class IOSBrowser {

    /**
     * Version of iOS
     */
    @prop({
        required: true,
        min: 10,
        max: 15
    })
    public version !: number;
  
}