import { prop, Ref, pre, modelOptions } from '@typegoose/typegoose';
import { getUnixDate, percentage, roundNumber } from 'src/utils/helpers';
import { TestResult } from './result.model';

export enum TestRunStatus {
    Passed = 'passed',
    Failed = 'failed',
    Running = 'running',
    Undefined = 'undefined'
}

/**
 * Item produced as a result of each each time
 * a test is ran, it has Test as parent and TestResult[] as child
 */
@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
@pre<TestRun>('save', function() {
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
export class TestRun {

    /**
     * Contains an array of ObjectIDs to the
     * children TestResults for this TestRun
     */
    @prop({
        ref: TestResult,
        default: []
    })
    public runs: Ref<TestResult>[];

    /**
     * Current status of the TestRun
     * Status:
     * - Passed: The TestRun has successfully ran with 0 NOK
     * - Failed: The TestRun has completed with some failed steps
     * - Running: The TestRun is currently running
     * - Undefined: The TestRun was just created
     */
    @prop({
        enum: TestRunStatus,
        default: TestRunStatus.Undefined
    })
    public status: TestRunStatus;

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
     * How much time did the TestRun take (in milliseconds).
     * The total time for the TestRun must come from the Test Runner
     * instead of calculating from the children, as it can differ because
     * we have to take initialization and completion times into account.
     */
     @prop({
        type: () => Number,
        default: 0
    })
    public executionTime !: number;

    /** 
     * Datetime when the TestRun completed
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