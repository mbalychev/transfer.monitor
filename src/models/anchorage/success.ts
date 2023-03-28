export interface SuccessAnchorage {
  id: string;
  date: string;
  model: ModelSuccess;
  code: string;
  name: string;
}

interface ModelSuccess {
  OrgDataId: number;
  orgH1: number;
  tOrgs: TOrgs;
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
  name?: string;
}