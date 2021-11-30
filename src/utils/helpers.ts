import { HttpException, HttpStatus } from "@nestjs/common";
import { Account, accountSafeFields } from "src/models";
import { TestBrowser } from "./interfaces";
import { TypegooseDocument } from "./types";

export function getUnixDate() {
    return Math.round( new Date().getTime() / 1000 );
}

export function isValidTestBrowser(browser: any): browser is TestBrowser {
    return 'type' in browser;
}

export function percentage(partialValue: number, totalValue: number) {
    return (100 * partialValue) / totalValue;
}

export function roundNumber(num: number, maxDecimalPlaces: number) {
    const exponent = Math.pow(10, maxDecimalPlaces);
    return Math.round((num + Number.EPSILON) * exponent) / exponent;
}

export function isEmail(email: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regex.test(email);
}

export function sanitizeRegex(regex: string): string {
    return regex.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&');
}

export function ErrorResponse(code: HttpStatus, error: string = '') {
    error = error.trim();
    throw new HttpException({
        status: code,
        success: false,
        ...(error) && { error }
    }, code);
}

/**
 * Allows to only select specific fields of a JSON object
 * @param json JSON object
 * @param fields Fields
 */
export function selectJSON(json: any, ...fields: string[]) {
    const result = {};
    for (const field of fields) {
        result[field] = json[field];
    }
    return result;
}

const PARSE_TO_PAIRS = /([0-9]+[^0-9]+)/g;
const PAIR_SPLIT = /^([0-9]+)([dhmsu]+)$/;
export function parseDuration(duration) {
    const matches = [];
    let array;
    while ((array = PARSE_TO_PAIRS.exec(duration)) !== null) {
        matches.push(array[0]);
    }
    const ms = matches.map(match => {
        const res = PAIR_SPLIT.exec(match);
        if (res === null) {
            throw new Error("Not a valid duration: " + match);
        }
        let factor = 0;
        switch (res[2]) {
            case 'd':
                factor = 86400000;
                break;
            case 'h':
                factor = 3600000;
                break;
            case 'm':
                factor = 60000;
                break;
            case 's':
                factor = 1000;
                break;
            case 'u':
                factor = 1;
                break;
            default:
                throw new Error("Not a valid duration unit: " + res[2]);
        }
        return parseInt(res[1]) * factor;
    })
    .reduce((total, value) => total + value, 0);
    return Math.floor(ms / 1000);
}

export function safeUser(account: TypegooseDocument<Account>) {
    return selectJSON(account.toJSON(), ...accountSafeFields);
}