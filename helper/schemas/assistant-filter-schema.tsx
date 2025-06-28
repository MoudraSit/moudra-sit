import * as yup from "yup";

export async function checkFilterNameUnique(name: string): Promise<boolean> {
  const res = await fetch(
    `/api/check-filter-name?name=${encodeURIComponent(name)}`
  );
  if (!res.ok) return false;
  const json = await res.json();
  return json.isUnique;
}

// schema for edit form validation
export const assistantFilterPartialSchema = yup.object({}).shape({
  isDefaultFilter: yup.boolean(),
});

// schema is returned as a function so that we can pass in client/server implementation of the fetch
export function buildAssistantFilterSchema(
  checkNameUnique: (name: string) => Promise<boolean>
) {
  return assistantFilterPartialSchema.concat(
    yup.object({
      name: yup
        .string()
        .required("Zadejte název filtru")
        .test(
          "unique-name",
          "Tento název filtru už existuje",
          async function (value) {
            if (!value) return true; // Required already handled above
            const isUnique = await checkNameUnique(value);
            return isUnique;
          }
        ),
    })
  );
}

export type NewAssistantFilterValues = yup.InferType<
  ReturnType<typeof buildAssistantFilterSchema>
>;
