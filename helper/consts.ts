export const WEB_APP_NAME = "Mobilní aplikace MS";

export const TOO_SMALL_HEIGHT = 500;

export const QUERY_OLD_DAYS = 5;

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
  // Not used anymore
  // ACCEPTED = "02. Přijato",
  IN_PROGRESS = "03. V řešení",
  SOLVED = "04. Vyřešeno - ukončeno",
  UNSOLVED = "05. Nevyřešeno - ukončeno",
  POSTPONED = "06. Odloženo",
}

export const FINISHED_STATUSES = [QueryStatus.SOLVED, QueryStatus.UNSOLVED];
export const WITHOUT_SOLVER_STATUSES = [
  QueryStatus.NEW,
  QueryStatus.FOR_HANDOVER,
  QueryStatus.POSTPONED,
];

export const QueryStatusLabels = {
  [QueryStatus.NEW]: "Nový",
  [QueryStatus.FOR_HANDOVER]: "K předání",
  // [QueryStatus.ACCEPTED]: "Přijato",
  [QueryStatus.IN_PROGRESS]: "V řešení",
  [QueryStatus.SOLVED]: "Vyřešeno - ukončeno",
  [QueryStatus.UNSOLVED]: "Nevyřešeno - ukončeno",
  [QueryStatus.POSTPONED]: "Odloženo",
};

// Object allows dynamic key names
export const QueryStatusColors = {
  [QueryStatus.NEW]: "#7BD7BE",
  [QueryStatus.IN_PROGRESS]: "#2766FF",
  [QueryStatus.FOR_HANDOVER]: "#FFC247",
  [QueryStatus.SOLVED]: "#12BA55",
  [QueryStatus.UNSOLVED]: "#08090C",
  [QueryStatus.POSTPONED]: "#9800F5",
};

export enum CommonPagePaths {
  LOGIN = "/prihlaseni",
  REGISTER_ASSISTANT = "/registrace/asistent",
  REGISTER_SENIOR = "/registrace/senior",
}
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
  CHANGES = "/zmeny",
  NEW_CHANGE = "/zmeny/nova",
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
  MEETING_LOCATION_TYPES = "mistoSetkani",
  SENIOR = "senior",
}

export enum QueryDeviceCategory {
  COMPUTER = "Počítač",
  PHONE = "Mobil",
  PRINTER = "Tiskárna",
  OTHER = "Jiné IT zařízení",
}

export enum MeetingLocationType {
  AT_SENIOR = "U mě doma",
  REMOTE = "Na dálku",
  LIBRARY = "V knihovně",
  OTHER = "Jinde",
}

export const MeetingLocationTypeLabels = {
  [MeetingLocationType.AT_SENIOR]: "U seniora doma",
  [MeetingLocationType.REMOTE]: "Vzdáleně (online/telefonicky)",
  [MeetingLocationType.LIBRARY]: "Spolupracující organizace (např. knihovna)",
  [MeetingLocationType.OTHER]: "Jiné místo",
};

export enum PhoneCountryCodes {
  CZ = "+420",
  SK = "+421",
}

export const phoneRegexWithCountryCode =
  /^([+]\d{1,3})?[ ]?(\d{3}[ ]?\d{3}[ ]?\d{3})$/;

export const MAX_QUERY_CARD_HEIGHT = 255;
export const MAX_QUERY_CARD_WIDTH = 500;

export const MAX_LIST_ITEM_HEIGHT = 70;

export enum AssistantStatus {
  AVAILABLE = "K dispozici",
  UNAVAILABLE = "Dočasně není k dispozici",
  TERMINATED = "Ukončená činnost",
  PENDING = "Čeká na schválení",
}

export const EDITABLE_ASSISTANT_STATUSES = [
  AssistantStatus.AVAILABLE,
  AssistantStatus.UNAVAILABLE,
];

// Object allows dynamic key names
export const AssistantStatusColors = {
  [AssistantStatus.AVAILABLE]: "#12BA55",
  [AssistantStatus.UNAVAILABLE]: "#FD6A40",
  [AssistantStatus.TERMINATED]: "rgb(110, 34, 37)",
  [AssistantStatus.PENDING]: "#FFC247",
};
