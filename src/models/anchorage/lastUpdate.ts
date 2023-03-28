export interface ILastUpdate {
  _id: Id;
  lastId: number;
  dateLastUpdate: string;
  dateCreateHelperOne: string;
  dateOrgData: string;
}

interface Id {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: string;
}