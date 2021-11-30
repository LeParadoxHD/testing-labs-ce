import { mongoose } from "@typegoose/typegoose";
import { BeAnObject, IObjectWithTypegooseFunction } from "@typegoose/typegoose/lib/types";

export type TypegooseDocument<T> = mongoose.Document<any, BeAnObject, any> & T & IObjectWithTypegooseFunction & { _id: any; };