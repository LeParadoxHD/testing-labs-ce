
/**
 * Step Interface
 * @used in Test
 * @description Defines how the test will execute
 */
export interface Step {
    /**
     * @description Text defining the behavior
     */
    content: string;
    /**
     * @description Whether or not this step will be executed
     * @default true
     */
    enabled: boolean;
    /**
     * @description Whether or not a screenshot will be taken
     * after the step has been completed
     * @default false
     */
    screenshot: boolean;
    /**
     * @description Amount of time in seconds the test runner
     * will wait for this step to finish
     * @default 60
     */
    timeout: number;
    /**
     * @description Whether or not the test runner will continue
     * when this step fails or throws an error
     * @default false
     */
    skipFailure: boolean;
}