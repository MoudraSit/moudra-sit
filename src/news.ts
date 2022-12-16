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
  id: number,
  title: string,
  date: string,
  description: string,
});

export const decodeNewsItems = array(decodeNewsItem);
