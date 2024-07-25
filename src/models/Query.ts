export interface Query {
  queryId?: number;
  custId?: number;
  custName: string;
  mobile: string;
  email?: string;
  userSrno?: number;
  queryTypeId?: number;
  sourceId?: number;
  subSourceId?: number;
  budgetId?: number;
  accomodationId?: number;
  brokerId?: number;
  followupTypeId?: number;
  followupDate?: string;
  // projId: number;
  OTPVerified?: boolean;
  remarksCustTable?: string;
  remarks?: string;
  status?: boolean;
}
