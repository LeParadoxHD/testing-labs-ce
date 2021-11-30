
export enum BrowserType {
    Desktop = 'desktop',
    Mobile = 'mobile',
    Android = 'android',
    iOS = 'ios'
}

export enum BrowserCodeName {
    Chrome = 'chrome',
    Firefox = 'firefox',
    Edge = 'edge'
}

/**
 * Test Browser Interface
 * @used in Test
 * @description Defines which browser/s will execute the test
 */
 export interface TestBrowser {
    /**
     * @description Type of browser to be used
     * Desktop: The browser will run in a Desktop environment
     * Mobile: The browser will run in a Desktop environment with a Mobile resolution
     * Android: The browser will run in an Android OS with a Devtools connected
     * iOS: The browser will run in an iOS OS with a Devtools connected
     * 
     * @default BrowserType.Desktop
     */
    type: BrowserType;
    /**
     * @description Code name of the browser to be used.
     * Example: chrome, firefox or edge.
     * In Android and iOS this property is ignored.
     */
    codeName?: BrowserCodeName;
    /**
     * @description Version of the browser to be used.
     * In Android and iOS this property is ignored.
     */
    version?: number | string;
    /**
     * @description Version of the OS to be used.
     * Used in Android and iOS.
     */
    os_version?: number | string;
    /**
     * @description Mobile specs to be used when type is Mobile
     */
    mobile_specs?: MobileSpecs;
}

interface MobileSpecs {
    device: string;
    width: number;
    height: number;
    pixel_ratio: number;
    user_agent: string;
}