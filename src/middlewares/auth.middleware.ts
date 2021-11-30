import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from "express";
import { EncryptionService } from 'src/services/encryption.service';
import { IRequest } from 'src/utils/interfaces';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private encryptionService: EncryptionService
    ) { }

    use(req: IRequest, res: Response, next: () => void) {
        if (req.headers.authorization) {
            // Authorization: Bearer <token> <websocketId>
            if (req.headers.authorization) {
                const parts = req.headers.authorization.split(' ');
                const token = parts[1];
                try {
                    const decoded = this.encryptionService.jwt_verify<{ userId: string }>(token);
                    req.userId = decoded.userId;
                } catch (err) {
                    console.log(err);
                }
                if (parts[2]) {
                    req.websocketId = parts[2];
                }
            }
        }
        next();
    }
} 