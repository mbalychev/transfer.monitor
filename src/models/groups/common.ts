export interface ICommonGroupResponse {
  models: CommonGroupError[];
  pageNumber: number;
  total: number;
  itemsOnPage: number;
}

export interface CommonGroupError {
  description: string;
  date: string;
}