import { Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import * as speakeasy from 'speakeasy';
import { toDataURL } from 'qrcode';
import { ConfigService } from "./config.service";
const saltRounds = 10;

@Injectable()
export class EncryptionService {

    constructor(
        private configService: ConfigService
    ) { }

    /**
     * Generates a hash for the given password
     * @param password The password to be hashed
     */
    async hash_password(password: string): Promise<string> {
        const salt = await genSalt(saltRounds);
        return await hash(password, salt);
    }

    /**
     * Returns true if the hash matches the given password
     * @param hash Hash
     * @param password Password
     */
    async verify_password(hash: string, password: string): Promise<boolean> {
        return await compare(password, hash);
    }

    jwt_encrypt(data: any): string {
        return sign(data, process.env.JWT_SECRET);
    }

    jwt_verify<T = any>(token: string): T | null {
        return <T> verify(token, process.env.JWT_SECRET);
    }

    decrypt_body_var<T, K extends keyof T>(body: T, key: K): T[K] {
        return this.configService.isDev() ? this.decrypt_base64(body[key]) : body[key];
    }

    decrypt_base64<T = any>(data: T): T {
        // @ts-expect-error
        return atob(data);
    }

    /**
     * Returns true if the 2fa code is valid against the given secret
     * @param userSecret User Secret
     * @param code User code
     */
    verify_2fa(userSecret: string, code: string): boolean {
        return speakeasy.totp.verify({
            secret: userSecret,
            encoding: 'base32',
            token: code
        });
    }

    async generate_qr_code(data: string) {
        return await toDataURL(data);
    }

    /**
     * Generates a secret, normally used to generated 2FA
     * and saved into account model `secret` or `tempSecret`
     * @returns GeneratedSecret
     */
    generate_2fa_secret(user: string): speakeasy.GeneratedSecret {
        return speakeasy.generateSecret({
            issuer: 'TestingLabs',
            name: `TestingLabs (${user})`
        });
    }

}