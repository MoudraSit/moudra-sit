import { decodeNewsItem } from "./news";

test("News decoding", () => {
  expect(
    decodeNewsItem({
      id: 1,
      title:
        "Webová aplikace Moudrá Síť bude zdarma pomáhat seniorům používat technologie",
      date: "7. prosince 2022",
      description:
        "V posledních letech se senioři dostávají do izolace. Z důvodu zdravotních potíží nebo epidemiologické situace se při své neschopnost elektronicky komunikovat s okolím často dostávají do neřešitelné situace, která mnohdy vede až k osobní tragédii. Stoupá počet...",
    })
  ).toEqual({
    id: 1,
    title:
      "Webová aplikace Moudrá Síť bude zdarma pomáhat seniorům používat technologie",
    date: "7. prosince 2022",
    description:
      "V posledních letech se senioři dostávají do izolace. Z důvodu zdravotních potíží nebo epidemiologické situace se při své neschopnost elektronicky komunikovat s okolím často dostávají do neřešitelné situace, která mnohdy vede až k osobní tragédii. Stoupá počet...",
  });
});
