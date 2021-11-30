import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { Variable, WebBrowser, MobileBrowser, AndroidBrowser, IOSBrowser } from 'src/models';
import { SharedModule } from '../shared.module';
import { AndroidBrowsersController } from './android/android.browsers.controller';
import { WebBrowsersController } from './web/web.browsers.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
        WebBrowser,
        MobileBrowser,
        AndroidBrowser,
        IOSBrowser
    ]),
    SharedModule
  ],
  controllers: [
    WebBrowsersController,
    AndroidBrowsersController
  ]
})
export class BrowsersModule {}