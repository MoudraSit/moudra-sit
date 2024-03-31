import { FormikHelpers } from "formik";
import ApiRequestCategory from "./api/category";
import ApiGetRequestSenior from "./api/get-senior";
import ApiRequestRequirment from "./api/requirment";
import ApiRequestSenior from "./api/senior";
import { IValues } from "./vertical-stepper";

const pcCategory = "Počítač";
const phoneCategory = "Mobil";
const printerCategory = "Tiskárna";
const otherCategory = "Jiné IT zařízení";

async function submitHelperTest(
  index: number,
  values: IValues,
  actions: FormikHelpers<IValues>,
  executeRecaptcha: {
    (action?: string | undefined): Promise<string>;
    (arg0: string): string | PromiseLike<string>;
  }
) {
  // get recaptcha token
  const gReCaptchaToken: string = await executeRecaptcha("enquiryFormSubmit");

  let idRequirment = null;

  // GET method to check if the record is already in the table
  let idSenior = await ApiGetRequestSenior(values);

  // POST method to create new senior record
  if (!idSenior) {
    idSenior = await ApiRequestSenior(values);

    // wait to generate new Google Meet link on Make.com
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // POST method to create new requirment record
  if (idSenior) {
    idRequirment = await ApiRequestRequirment(values, idSenior);
  }

  // POST method to connect requirment to multiple categories
  if (idRequirment) {
    if (values.phoneCheckbox) {
      await ApiRequestCategory(idRequirment, phoneCategory);
    }

    if (values.pcCheckbox) {
      await ApiRequestCategory(idRequirment, pcCategory);
    }

    if (values.printerCheckbox) {
      await ApiRequestCategory(idRequirment, printerCategory);
    }

    if (values.otherCheckbox) {
      await ApiRequestCategory(idRequirment, otherCategory);
    }
  }
}

export default submitHelperTest;
