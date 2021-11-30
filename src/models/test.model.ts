import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ErrorCodes } from 'src/utils/error-codes';
import { getUnixDate, isValidTestBrowser } from 'src/utils/helpers';
import { Application } from './application.model';
import { Department } from './department.model';
import { Environment } from './environment.model';
import { isValidCron } from 'cron-validator';
import { TestRun } from './run.model';
import { Step, TestBrowser } from 'src/utils/interfaces';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { nameRegex } from 'src/utils/regex';

/**
 * Contains all the information about a Test.
 * Including ID, Name, Steps, Schedules, etc
 */
@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class Test {

    /**
     * Name of the test
     */
    @prop({
        validate: nameRegex,
        required: true,
        trim: true
    })
    public name !: string;

    /**
     * Description of the test
     */
    @prop({
        trim: true,
        default: ''
    })
    public description: string;

    /**
     * ObjectID reference to the assigned application
     */
    @prop({
        ref: Application,
        required: true
    })
    public application !: Ref<Application>;

    /**
     * ObjectID reference to the assigned environment
     */
    @prop({
        ref: Environment,
        required: true
    })
    public environment !: Ref<Environment>;

    /**
     * ObjectID reference to the assigned department
     */
    @prop({
        ref: Department,
        required: true
    })
    public department !: Ref<Department>;

    /**
     * Array of steps assigned to this step
     * 
     * A validator is used to check if this property
     * is an array, property validation will be done in
     * the near future
     * @todo Property validation
     */
    @prop({
        type: () => [Object],
        validate: {
            validator: (steps) => Array.isArray(steps),
            message: ErrorCodes.INVALID_STEPS
        },
        default: []
    }, WhatIsIt.ARRAY)
    public steps: Step[];

    /**
     * Schedules to be used for this test
     * 
     * It must be an array of string containing valid Cron strings
     */
    @prop({
        type: () => [String],
        validate: [
            {
                /**
                 * Validate the schedules property is an array
                 */
                validator: ((schedules: string[]) => {
                    return Array.isArray(schedules);
                }),
                message: ErrorCodes.INVALID_SCHEDULES
            },
            {
                /**
                 * Validate the schedules property contains an
                 * array of valid Crontab jobs
                 */
                validator: ((schedules: string[]) => {
                    return schedules.every(schedule => isValidCron(schedule))
                }),
                message: ErrorCodes.INVALID_SCHEDULES
            }
        ],
        default: []
    }, WhatIsIt.ARRAY)
    public schedules: string[];

    @prop({
        type: () => [Object],
        validate: [
            {
                /**
                 * Validate the browsers property is an array
                 */
                validator: (browsers: TestBrowser[]) => Array.isArray(browsers),
                message: ErrorCodes.INVALID_BROWSERS
            },
            {
                /**
                 * Validate the browsers property is an array of valid browsers
                 */
                validator: (browsers: TestBrowser[]) => isValidTestBrowser(browsers),
                message: ErrorCodes.INVALID_BROWSERS
            }
        ],
        default: []
    }, WhatIsIt.ARRAY)
    public browsers !: TestBrowser[];

    /**
     * @todo Add history of changes
     */
    /* @prop({
        default: []
    })
    public editHistory: HistoryItem[]; */

    /**
     * Whether or not to record a video of the test
     */
    @prop({
        default: false
    })
    public recordVideo: boolean;

    /**
     * Contains an array of ObjectIDs to the
     * children TestRuns for this Test
     */
    @prop({
        ref: TestRun,
        default: []
    })
    public runs: Ref<TestRun>[];

    /**
     * Contains an array of filenames previously
     * uploaded via Edit Test and which can be referenced in
     * step definition parameters
     */
    @prop({
        type: () => [String],
        default: []
    }, WhatIsIt.ARRAY)
    public files: string[]

    /**
     * When was this test created?
     */
    @prop({
        default: getUnixDate()
    })
    public createdOn !: number;
  
}
