/* eslint-disable no-unused-vars */
export enum Role {
  SENIOR = "senior",
  DA = "digitalni-asistent",
}

export enum AssistantStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
}

export enum SeniorRequestStatus {
  NEW = "00. Nový",
  FOR_HANDOVER = "01. K předání",
}

export enum AssistantPagePaths {
  ASSISTANT_PROFILE = "/asistent",
  DASHBOARD = "/prehled",
  SENIOR_REQUESTS = "/dotazy",
}

export enum SeniorPagePaths {
  SENIOR_PROFILE = "/senior",
}

// Request types are a custom UI category unlike request statuses defined in Tabidoo
export enum SeniorRequestType {
  NEW = "novy",
  FOR_HANDOVER = "k-predani",
  MINE = "moje",
}

export enum FilterType {
  REQUEST_TYPE = "typDotazu",
}
