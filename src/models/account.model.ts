import { modelOptions, prop } from '@typegoose/typegoose';
import { WhatIsIt } from '@typegoose/typegoose/lib/internal/constants';
import { getUnixDate, isEmail } from 'src/utils/helpers';
import { UserRole } from 'src/utils/interfaces';
import { alphanumericRegex } from 'src/utils/regex';

export interface Preferences {
    [prefId: string]: any;
}

export const accountSafeFields: (keyof Account | '_id')[] = [
    '_id',
    'name',
    'email',
    'createdOn',
    'preferences',
    'username',
    'role'
]

@modelOptions({
    schemaOptions: {
        versionKey: false
    }
})
export class Account {

    /**
     * Public name of the user
     */
    @prop({
        type: () => String,
        required: true,
        trim: true
    })
    public name !: string;

    /**
     * Email of the user
     */
    @prop({
        type: () => String,
        validate: {
            validator: val => isEmail(val),
            message: `Invalid email provided.`
        },
        required: true,
        index: true,
        unique: true,
        trim: true
    })
    public email !: string;

    @prop({
        type: () => String,
        minlength: 8
    })
    public password: string;

    @prop({
        enum: UserRole,
        default: UserRole.Viewer
    })
    public role !: UserRole;

    /**
     * When was this user created?
     */
    @prop({
        type: () => Number,
        default: getUnixDate()
    })
    public createdOn !: number;

    /**
     * Permanent storage for the user settings
     */
    @prop({
        type: () => Object,
        default: {}
    }, WhatIsIt.MAP)
    public preferences?: Preferences;

    /**
     * Username of the user
     */
    @prop({
        type: () => String,
        validate: alphanumericRegex,
        required: true,
        index: true,
        unique: true,
        trim: true,
        minlength: 5
    })
    public username !: string;

    /**
     * Stores the secret key for 2FA Authentication
     */
    @prop({
        type: () => String
    })
    public secret: string;

    /**
     * Temporarily store a secret key for 2FA Authentication (when configuring)
     */
    @prop({
        type: () => String
    })
    public tempSecret: string;
  
}