
export type IErorResultsResponse =  IErrorsResults;
interface IErrorsResults {
  pageInfo: PageInfo;
  xmlErrors: XmlError[];
}

export interface XmlError {
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

export interface PageInfo {
  totalItems: number;
  currentPages: number;
  onPage: number;
}
