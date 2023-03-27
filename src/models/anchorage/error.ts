export interface IAnchorageResponse {
  pageNumber: number;
  totalPages: number;
  itemsOnPage: number;
  successResult?: any;
  badResult: BadResult[];
}

interface BadResult {
  response: Response;
  description: string;
  id: string;
  date: string;
  model: Model;
  code: string;
}

interface Model {
  orgDataId: number;
  orgH1: number;
  TOrgs: TOrgs;
  dateCreateH1: string;
  inn: string;
  kpp: string;
  ogrn: string;
  value: number;
  tBrokerOrgDocs: TBrokerOrgDocs;
  tBrokerOrgDocComments: TBrokerOrgDocComments;
}

interface TBrokerOrgDocComments {
  tBODC_Comment: string;
}

interface TBrokerOrgDocs {
  tBOD_ID: number;
  tBOD_Type: number;
  tBOD_Broker: number;
  tBOD_IsConfirmed: boolean;
}

interface TOrgs {
  tO_UUID: string;
}

interface Response {
  code: number;
  message: string;
  status: number;
  name: string;
  success: boolean;
  'error-info': string;
}