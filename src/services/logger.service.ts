import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class LoggerService {

    private readonly _logger = new Logger('TestingLabs');

    log(msg: any) {
        this._logger.log(msg);
    }

    warn(msg: any) {
        this._logger.warn(msg);
    }

    error(msg: any) {
        this._logger.error(msg);
    }

    debug(msg: any) {
        this._logger.debug(msg);
    }

}