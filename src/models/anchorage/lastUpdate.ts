export interface ILastUpdate {
  _id: Id;
  lastId: number;
  dateLastUpdate: string;
  dateCreateHelperOne: string;
  dateOrgData: Date;
}

interface Id {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: string;
}