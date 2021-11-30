import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {

    private envs = {};

    constructor() {
        this.envs = process.env;
    }

    public get = (key: string) => this.envs[key];

    public set = (key: string, value: any) => this.envs[key] = value;

    public isDev = () => this.get('MODE') === 'dev';

    public isProd = () => this.get('MODE') === 'prod';

}