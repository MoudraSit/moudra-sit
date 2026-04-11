import * as yup from "yup";

// schema for form validation
export const assistantTrainingMaterialsConfirmationSchema = yup.object({}).shape({
  confirmedTrainingMaterials: yup.boolean().oneOf([true], "Musíte potvrdit, že jste si prostudoval/a školící materiály pro Digitální asistenty."),
});
