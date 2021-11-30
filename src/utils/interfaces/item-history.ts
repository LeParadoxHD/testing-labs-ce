
export interface HistoryItem {
    /** ID reference of the user who performed the edit */
    by: string;
    /** When did this user perform and edit */
    date: number;
    /** Which properties did the user change */
    properties: string[];
}