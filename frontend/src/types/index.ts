export interface Label {
  id: string;
  key: string;
  name: string;
  defaultName: string;
  personalizedName?: string;
}

export interface LabelsResponse {
  success: boolean;
  message: string;
  moduleName: string;
  screenName: string;
  tenantId: string;
  labels: Label[];
}

export interface SingleLabelResponse {
  id: string;
  key: string;
  name: string;
  defaultName: string;
}

export interface UpdateLabelPayload {
  personalizedName: string;
  updatedBy: string;
}

export interface UpdateLabelResponse {
  success: boolean;
  message: string;
  moduleName: string;
  screenName: string;
  tenantId: string;
  labels: Label[];
}

export type ScreenName = 'Lead Generation' | 'Customer Details';
export type TenantId = 'tenant1' | 'tenant2';
export type ModuleName = 'lending';