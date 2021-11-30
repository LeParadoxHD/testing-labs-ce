import { Controller, Get } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { WebBrowser } from 'src/models';
import { Cron, CronExpression } from '@nestjs/schedule';
import { accessSync, exists, existsSync } from 'fs';
import { resolve } from 'path';
import { LoggerService } from 'src/services/logger.service';

@Controller('browsers/web')
export class WebBrowsersController {
    
    constructor(
      @InjectModel(WebBrowser) private readonly browserModel: ReturnModelType<typeof WebBrowser>,
      private logger: LoggerService
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    parseSelenoidBrowsers() {
      this.logger.log('parseSelenoidBrowsers job started');
      let file = null;
      if (existsSync('/code')) {
        file = '/code/hub/browsers.json';
      } else {
        file = resolve(__dirname + '../hub/browsers.json');
      }
      if (accessSync(file)) {
        
      }
    }
    
}
