import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { getUnixDate } from "src/utils/helpers";
import { nameRegex } from "src/utils/regex";
import { Test } from "./test.model";

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class Folder {
    
    /**
     * Folder name
     */
    @prop({
        validate: nameRegex,
        trim: true,
        required: true
    })
    public name !: string;

    /**
     * Nested folders inside this one.
     * Uses autopopulate, which means it normally contains an
     * array of folder ObjectIDs but will return the referenced
     * objects when retrieving through a query.
     */
    @prop({
        ref: Folder,
        autopopulate: true,
        default: []
    })
    public folders !: Ref<Folder>[];

    /**
     * Nested tests inside this folder.
     * Uses autopopulate, which means it normally contains an
     * array of folder ObjectIDs but will return the referenced
     * objects when retrieving through a query.
     */
     @prop({
        ref: Test,
        autopopulate: true,
        default: []
    })
    public tests !: Ref<Test>[];

    /**
     * When was this folder created?
     */
     @prop({
        type: () => Number,
        default: getUnixDate()
    })
    public createdOn !: number;

}