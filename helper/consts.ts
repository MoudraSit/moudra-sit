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
export enum QueryStatus {
  NEW = "00. Nový",
  FOR_HANDOVER = "01. K předání",
  ACCEPTED = "02. Přijato",
  IN_PROGRESS = "03. V řešení",
  SOLVED = "04. Vyřešeno - ukončeno",
  UNSOLVED = "05. Nevyřešeno - ukončeno",
  POSTPONED = "06. Odloženo",
}

export enum QueryStatusColors {
  NEW = "#D3215D",
  IN_PROGRESS = "#0063CC",
  FOR_HANDOVER = "#FF921D",
  SOLVED = "#188823"
}

// Include subpaths for easy referencing in the app
// Query and dynamic path parameters (e.g., .../id/...) should not be here
export enum AssistantPagePaths {
  ASSISTANT_PROFILE = "/asistent",
  DASHBOARD = "/prehled",
  SENIOR_QUERIES = "/dotazy",
  NEW_SENIOR_QUERY = "/dotazy/novy",
  VISITS = "/navstevy",
  NEW_VISIT = "/navstevy/nova",
}

export enum SeniorPagePaths {
  SENIOR_PROFILE = "/senior",
}

export enum FilterType {
  QUERY_STATUS = "stavDotazu",
  LOCATION = "lokalita",
  USER_ASSIGNED = "jenMojeDotazy",
  DEVICE_CATEGORY = "kategorieDotazu",
  SENIOR = "senior",
}

export enum QueryDeviceCategory {
  COMPUTER = "Počítač",
  PHONE = "Mobil",
  PRINTER = "Printer",
  OTHER = "Jiné IT zařízení",
}

export enum VisitMeetLocation {
  AT_SENIOR = "U Seniora",
  REMOTE = "Vzdáleně (online/telefonicky)",
  LIBRARY = "Knihovna / klub",
  OTHER = "Jiné místo",
}

export enum PhoneCountryCodes {
  CZ = "+420",
  SK = "+421",
}

export const phoneRegexWithCountryCode =
  /^([+]\d{1,3})?[ ]?(\d{3}[ ]?\d{3}[ ]?\d{3})$/;
