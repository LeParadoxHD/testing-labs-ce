import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IRequest } from 'src/utils/interfaces';

@Injectable()
export class RequiresAuthMiddleware implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction) {
        if (req.userId) {
            next();
        } else {
            res.status(HttpStatus.FORBIDDEN).send();
        }
    }
}