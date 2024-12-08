import { Organization } from "types/assistant";

export function getOrganizationLabel(option: Organization) {
  return option?.fields?.nazev ?? "";
}

export function isOrganizationEqual(option: Organization, value: Organization) {
  return option?.id === value?.id;
}
