import dayjs from "dayjs";

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

export function formatDate(date: string) {
  return date ? new Date(date).toLocaleDateString("cs-CZ") : "";
}

export function formatDateTime(date: string) {
  return date ? new Date(date).toLocaleString("cs-CZ") : "";
}

export function formatMonth(month: string | number) {
  month = Number(month);

  return new Date(2000, month, 1).toLocaleString("cs-CZ", { month: "long" });
}

// Tabidoo BE has no timezone info and understands dates to be in the CET timezone
// Using toISOString() returns UTC time (-1 or -2 hours), which needs to be compensated for
export function createTabidooDateString(date: Date) {
  const timeZoneOffsetHours = date.getTimezoneOffset() / 60;
  const now = dayjs().add(timeZoneOffsetHours, "hour");
  return now.toISOString();
}

export function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function removeSpaces(str: string) {
  return (str = str.replace(/\s/g, ""));
}
