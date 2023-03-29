import { SuccessAnchorage } from "./anchorage/success";

export const dateConvert = (dateString?: string): string => {
    if(dateString)
        {
            const date: Date = new Date(dateString);
            return String(`${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`);
        }
        else
            return '';
    }

    ////без UTC
    export const dateConvertNonLocal = (dateString?: string): string => {
    if(dateString)
        {
            const date: Date = new Date(dateString);
            return String(`${date.toDateString()} - ${date.toTimeString()}`);
        }
        else
            return '';
    }