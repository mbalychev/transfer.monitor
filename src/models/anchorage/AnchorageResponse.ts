import { ICommonError } from "./commonError";
import { BadResult } from "./error";
import { SuccessAnchorage } from "./success";

export interface IAnchorageResponse {
  pageNumber: number;
  total: number;
  itemsOnPage: number;
  successResultModels?:any;
  badResult?: BadResult[];
  successResult?:  SuccessAnchorage[];
  commonErrors?: ICommonError[];
}