export interface IErrorsResults {
    id: number;
    parentId?: number;
    fileId: number;
    fileSourceId: number;
    typeId: number;
    appId: number;
    comment: string;
    techData: string;
    dateCreate: string;
    app?: string;
    result?: string;
}

export type IErorResultsResponse =  IErrorsResults[];
