export interface ISuccessGroupResponse {
  models: ISuccessGroup[];
  pageNumber: number;
  total: number;
  itemsOnPage: number;
}

interface ISuccessGroup {
  modelGroup: ModelGroup;
  date: string;
  model?: any;
  description?: string;
}

interface ModelGroup {
  name: string;
  comment: string;
}