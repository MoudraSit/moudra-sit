/* eslint-disable no-unused-vars */
export enum Role {
  SENIOR = "senior",
  DA = "digitalni-asistent",
}

export enum AssistantStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
}

// The strings are horrible in the URL search params, but they are used in Tabidoo
export enum SeniorRequestStatus {
  NEW = "00. Nový",
  FOR_HANDOVER = "01. K předání",
}

// Include subpaths for easy referencing in the app
// Query and dynamic path parameters (e.g., .../id/...) should not be here
export enum AssistantPagePaths {
  ASSISTANT_PROFILE = "/asistent",
  DASHBOARD = "/prehled",
  SENIOR_REQUESTS = "/dotazy",
  NEW_SENIOR_QUERY = "/dotazy/novy",
  VISITS = "/navstevy",
  NEW_VISIT = "/navstevy/nova",
}

export enum SeniorPagePaths {
  SENIOR_PROFILE = "/senior",
}

export enum FilterType {
  QUERY_TYPE = "typDotazu",
  USER_ASSIGNED = "jenMojeDotazy",
}
