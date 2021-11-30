import { prop, pre, modelOptions } from '@typegoose/typegoose';
import { getUnixDate, percentage, roundNumber } from 'src/utils/helpers';
import { TestBrowser } from 'src/utils/interfaces';

export enum TestResultStatus {
    Passed = 'passed',
    Failed = 'failed',
    Running = 'running',
    Undefined = 'undefined'
}

/**
 * Item produced as a result of each each time
 * a test is ran, it has TestRun as parent
 */
@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
@pre<TestResult>('save', function() {
    // Populate skipped property
    const total = this.total || 0;
    const ok = this.ok || 0;
    const nok = this.nok || 0;
    this.skipped = total - ok - nok;
    // Calculate successRate and failureRate
    if (total > 0) {
        this.successRate = roundNumber(percentage(ok, total), 2);
        this.failureRate = roundNumber(percentage(nok, total), 2);
    }
})
export class TestResult {

    /**
     * Assigned TestBrowser to this run
     */
    @prop({
        type: () => Object,
        required: true
    })
    public browser !: TestBrowser;

    /**
     * Video URL relative to proxy
     * Will be null if the user didn't mark the test to recordVideo
     */
    @prop({
        default: null
    })
    public videoUrl: string | null;

    /**
     * Current status of the TestResult
     * Status:
     * - Passed: The TestResult has successfully ran with 0 NOK
     * - Failed: The TestResult has completed with some failed steps
     * - Running: The TestResult is currently running
     * - Undefined: The TestResult was just created
     */
    @prop({
        enum: TestResultStatus,
        default: TestResultStatus.Undefined
    })
    public status: TestResultStatus;

    /**
     * The total number of steps the Test had when it ran
     * It should be the same as Test.steps.length
     */
    @prop({
        type: () => Number,
        default: 0
    })
    public total !: number;

    /**
     * Number of total steps which have succeeded
     */
     @prop({
        type: () => Number,
        default: 0
    })
    public ok !: number;

    /**
     * Number of steps which have failed
     * Normally 1, unless the Test has steps configured with skip_failure
     */
     @prop({
        type: () => Number,
        default: 0
    })
    public nok !: number;

    /**
     * Number of steps which have been skipped
     * This is a calculation of total - ok - nok, performed at @pre
     */
    @prop({
        default: 0
    })
    public skipped !: number;

    /**
     * Percent of successful steps
     * Calculation performed at @pre
     */
     @prop({
        default: 0
    })
    public successRate !: number;

    /**
     * Percent of failed steps
     * Calculation performed at @pre
     */
     @prop({
        default: 0
    })
    public failureRate !: number;

    /**
     * How much time did the TestResult take (in milliseconds).
     */
     @prop({
        type: () => Number,
        default: 0
    })
    public executionTime !: number;

    /** 
     * Datetime when the TestResult completed
     */
    @prop({
        type: () => Number
    })
    public datetime !: number;

    /**
     * Helps to update the datetime
     */
    public updateDateTime() {
        this.datetime = getUnixDate();
    }
  
}