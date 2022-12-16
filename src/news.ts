import {
  array,
  decodeType,
  number,
  optional,
  record,
  string,
} from "typescript-json-decoder";

export type NewsItem = decodeType<typeof decodeNewsItem>;

export const decodeNewsItem = record({
  id: string,
  title: string,
  date: string,
  description: string,
});

export const decodeNewsItems = array(decodeNewsItem);
