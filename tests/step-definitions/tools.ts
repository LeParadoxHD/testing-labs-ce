import { Given, When, Then } from '@wdio/cucumber-framework';

import { Browser } from 'webdriverio';

declare const browser: Browser<'async'>;

Given(/^I take a screenshot$/, async () => {
    await browser.saveScreenshot(`step_1.png`);
});