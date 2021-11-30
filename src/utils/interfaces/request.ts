
import { Request } from "express";

export interface IRequest extends Request {
    /**
     * String containing the ObjectId of the current logged user, null if not logged
     */
    userId?: string;
    /**
     * String containing the WS Socket ID of the current logged user. 
     * null if not logged or disconnected
     */
    websocketId?: string;
}
