import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { TestBrowser } from "src/utils/interfaces";
import { TestResult } from "./result.model";
import { TestRun } from "./run.model";
import { Test } from "./test.model";

/**
 * Contains all the necessary information related
 * to each browser running a Test in the background.
 * Includes useful information like the PID, the test being executed,
 * the browser JSON, etc
 */
@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class TestRunner {

    /**
     * The Test object which the TestRunner is
     * currently assigned to. 
     * Contains a JSON copy because the information of the Test
     * can be changed while the Test is running.
     */
    @prop({
        type: () => Object,
        required: true
    })
    public test !: Test;

    /**
     * The TestBrowser JSON which the TestRunner
     * is currently using
     */
    @prop({
        type: () => Object,
        required: true
    })
    public browser !: TestBrowser;

    /**
     * The PID number of this TestRunner.
     * The PID is the process ID used by the TestRunner
     */
    @prop({
        type: () => Number,
        required: true
    })
    public pid !: number;

    /**
     * The TestRun ObjectID which the TestRunner is
     * currently assigned to
     */
    @prop({
        ref: TestRun,
        required: true
    })
    public run !: Ref<TestRun>;

    /**
     * The TestResult ObjectID which the TestRunner is
     * currently assigned to
     */
    @prop({
        ref: TestResult,
        required: true
    })
    public result !: Ref<TestResult>;

    /**
     * The total steps of the current execution.
     * Comes from Test.total
     */
    @prop({
        default: 0
    })
    public total: number;

    /**
     * The successful step count of the current execution.
     */
     @prop({
        default: 0
    })
    public ok: number;

    /**
     * The failed step count of the current execution.
     */
     @prop({
        default: 0
    })
    public nok: number;
}