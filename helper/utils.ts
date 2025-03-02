import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

import {
  QUERY_OLD_DAYS,
  QueryStatus,
  MeetingLocationType,
  MeetingLocationTypeLabels,
} from "./consts";
import { SeniorQuery } from "types/seniorQuery";

export function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart = (Math.random() * 46656) | 0;
  let secondPart = (Math.random() * 46656) | 0;
  return (
    ("000" + firstPart.toString(36)).slice(-3) +
    ("000" + secondPart.toString(36)).slice(-3)
  );
}

export function formatDate(date?: string | Date) {
  return date ? new Date(date).toLocaleDateString("cs-CZ") : "";
}

export function formatDateTime(date?: string | Date) {
  return date
    ? dayjs.utc(date).tz("Europe/Prague").format("DD. MM. YYYY HH:mm")
    : "";
}

export function formatMonth(month: string | number) {
  month = Number(month);

  return new Date(2000, month, 1).toLocaleString("cs-CZ", { month: "long" });
}

export function createTabidooDateTimeString(date?: Date) {
  if (!date) return undefined;
  return date.toISOString();
}

export function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function removeSpaces(str: string) {
  return (str = str.replace(/\s/g, ""));
}

export function removeHTMLTags(value?: string) {
  if (!value) return "";
  const regex = /(<([^>]+)>)/gi;
  return value.replace(regex, "");
}

export function labelVisitLocationTypes(locations: any) {
  /* This field used to be a string historically */
  return typeof locations === "object"
    ? locations
        .map(
          (loc: MeetingLocationType) => MeetingLocationTypeLabels[loc] ?? loc
        )
        .join(", ")
    : locations in MeetingLocationTypeLabels
    ? MeetingLocationTypeLabels[locations as MeetingLocationType]
    : locations;
}

export function checkIfQueryTooOld(query: SeniorQuery) {
  const queryCreatedDate = dayjs(query.fields.datumVytvoreni);
  const now = dayjs();
  return (
    queryCreatedDate.add(QUERY_OLD_DAYS, "day").isBefore(now) &&
    [QueryStatus.NEW, QueryStatus.POSTPONED].includes(
      query.fields.stavDotazu as QueryStatus
    )
  );
}

export function checkIfVisitInThePast(query: SeniorQuery) {
  const visitDate = dayjs(
    query.fields.posledniZmenaLink?.fields.datumPlanovanaNavsteva
  );
  const now = dayjs();
  return visitDate.isBefore(now);
}
