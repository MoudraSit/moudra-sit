"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import * as React from "react";
import * as yup from "yup";

import { Form, Formik } from "formik";
import { newQuerySchema } from "helper/schemas/new-query-schema";
import TextFieldForm from "components/form/model/input-form";
import { createQuery } from "./actions";

// TODO: styling, proper color, and props
function FormHeadline({ text }: { text: string }) {
  return (
    <Grid item xs={12}>
      <Typography sx={{ background: "grey", padding: "0.5rem" }} variant="h6">
        {text}
      </Typography>
    </Grid>
  );
}

type NewQueryValues = yup.InferType<typeof newQuerySchema>;

const initialValues = {
  queryTitle: "",
};

// TODO: error handling (if it fails on the server side)
// TODO: empty form after submitting
function NewQueryForm() {
  // useFormState() does not work with Formik
  const [isPending, setIsPending] = React.useState(false);

  async function submit(values: NewQueryValues) {
    setIsPending(true);
    await createQuery(values);
    setIsPending(false);
  }

  return (
    <Formik<NewQueryValues>
      initialValues={initialValues as unknown as NewQueryValues}
      validationSchema={newQuerySchema}
      onSubmit={(values) => submit(values)}
    >
      {/*  eslint-disable-next-line no-unused-vars */}
      {({ setFieldValue }) => (
        <Form autoComplete="off">
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <FormHeadline text="Dotaz" />
              <Grid item xs={12} sm={6}>
                <TextFieldForm
                  name="queryTitle"
                  fullWidth
                  id="queryTitle"
                  label="Název dotazu"
                  color="info"
                  inputhelper=""
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20,
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              sx={{
                mt: 3,
                mb: 3,
                bgcolor: "#D3215D !important",
                color: "white",
              }}
            >
              Uložit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default NewQueryForm;
