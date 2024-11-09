export const WEB_APP_NAME = "Mobilní aplikace MS";

/* eslint-disable no-unused-vars */
export enum Role {
  SENIOR = "senior",
  DA = "digitalni-asistent",
}

export enum AssistantAuthStatus {
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

export const FINISHED_STATUSES = [QueryStatus.SOLVED, QueryStatus.UNSOLVED];

// Object allows dynamic key names
export const QueryStatusColors = {
  [QueryStatus.NEW]: "#FD6A40",
  [QueryStatus.IN_PROGRESS]: "#2766FF",
  [QueryStatus.FOR_HANDOVER]: "#FFC247",
  [QueryStatus.SOLVED]: "#12BA55",
  [QueryStatus.UNSOLVED]: "#08090C",
  [QueryStatus.POSTPONED]: "#9800F5",
};

// Include subpaths for easy referencing in the app
// Query and dynamic path parameters (e.g., .../id/...) should not be here
export enum AssistantPagePaths {
  ASSISTANT_PROFILE = "/asistent",
  ASSISTANT_PROFILE_PERSONAL_INFORMATION = "/asistent/osobni-udaje",
  ASSISTANT_PROFILE_MY_SCORE = "/asistent/moje-hodnoceni",
  ASSISTANT_PROFILE_ATTENDANCE = "/asistent/dochazka",
  ASSISTANT_PROFILE_SETTINGS = "/asistent/nastaveni",
  DASHBOARD = "/prehled",
  SENIOR_QUERIES = "/dotazy",
  NEW_SENIOR_QUERY = "/dotazy/novy",
  VISITS = "/navstevy",
  NEW_VISIT = "/navstevy/nova",
}

export const QUERY_DETAIL_TAB = "detail";
export const QUERY_CHANGES_TAB = "zmeny";

export enum SeniorPagePaths {
  SENIOR_PROFILE = "/senior",
}

export enum FilterType {
  QUERY_STATUS = "stavDotazu",
  LOCATION = "lokalita",
  USER_ASSIGNED = "jenMojeDotazy",
  DEVICE_CATEGORY = "kategorieMultichoice",
  SENIOR = "senior",
}

export enum QueryDeviceCategory {
  COMPUTER = "Počítač",
  PHONE = "Mobil",
  PRINTER = "Tiskárna",
  OTHER = "Jiné IT zařízení",
}

export enum VisitMeetLocation {
  AT_SENIOR = "U seniora",
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

export const MAX_QUERY_CARD_HEIGHT = 245;
export const MAX_QUERY_CARD_WIDTH = 500;

export const MAX_LIST_ITEM_HEIGHT = 70;

export enum AssistantStatus {
  AVAILABLE = "K dispozici",
  UNAVAILABLE = "Dočasně není k dispozici",
  TERMINATED = "Ukončená činnost",
  PENDING = "Čeká na schválení",
}

// Object allows dynamic key names
export const AssistantStatusColors = {
  [AssistantStatus.AVAILABLE]: "#12BA55",
  [AssistantStatus.UNAVAILABLE]: "#FD6A40",
  [AssistantStatus.TERMINATED]: "rgb(110, 34, 37)",
  [AssistantStatus.PENDING]: "#FFC247",
};
