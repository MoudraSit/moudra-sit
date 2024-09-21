"use client";

import { Box, Button, Grid, Typography , Select , MenuItem, SelectChangeEvent, InputLabel, Input } from "@mui/material";
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
      <Typography sx={{ backgroundColor : "#F4F4F4" , padding: "0.5rem" , margin : "10px"}} variant="h6">
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
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [selectDevice,setSelectDevice] = React.useState<string>("");
  const [meetingPoint,setMeetingPoint] = React.useState<string>("");

  async function submit(values: NewQueryValues) {
    setIsPending(true);
    await createQuery(values);
    setIsPending(false);
  }

  function handleSelectDevice(e : SelectChangeEvent) {
    setSelectDevice(e.target.value)
  }

  function handleMeetingPointSelect(e : SelectChangeEvent) {
    setMeetingPoint(e.target.value);
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
              <Grid item xs={12} sm={6}>

              
              
              <TextFieldForm
                  name="seniorName"
                  fullWidth
                  id="seniorName"
                  label="Jméno"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                />  

                <TextFieldForm
                  name="seniorSurname"
                  fullWidth
                  id="seniorSurname"
                  label="Příjmení"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                />  


                <TextFieldForm
                  name="seniorYearOfBirth"
                  fullWidth
                  id="seniorYearOfBirth"
                  label="Rok Narození"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                />  
                

              <TextFieldForm
                  name="seniorEmail"
                  type="email"
                  fullWidth
                  id="seniorEmail"
                  label="E-mail"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                />   


                <TextFieldForm
                  name="seniorPhoneNumber"
                  type="tel"
                  placeholder="+420"
                  fullWidth
                  id="seniorPhoneNumber"
                  label="Telefon"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
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


               <TextFieldForm
                  name="seniorCity"
                  fullWidth
                  id="seniorCity"
                  label="Město"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                /> 

                {/* Section Dotaz */}
                <FormHeadline text="Dotaz" />  

                <TextFieldForm
                  name="queryName"
                  fullWidth
                  id="queryName"
                  label="Název Dotazu"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                />     
                
                <TextFieldForm
                  name="detailQueryDescription"
                  fullWidth
                  multiline
                  rows={4}
                  id="detailQueryDescription"
                  label="Detailní Popis Dotazu"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
                    },
                  }}
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                /> 

                 <InputLabel sx={{margin : "10px"}}>Zařízení</InputLabel> 
                 <Select
                    value={selectDevice}
                    onChange={handleSelectDevice}
                    displayEmpty
                    fullWidth
                    label=""
                    sx={{margin : "10px"}}
                    inputProps={{
                      style: {
                        textTransform: "capitalize",
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                        fontSize: 20
                      },
                    }}
                  >
                    <MenuItem value="" disabled>Vybrat</MenuItem>
                    <MenuItem value={10}>Telefon</MenuItem>
                    <MenuItem value={20}>Počítač</MenuItem>
                    <MenuItem value={30}>Televize</MenuItem>
                  </Select>    
                
                  <InputLabel sx={{margin : "10px"}}>Místo Setkání</InputLabel>  
                  <Select
                    value={meetingPoint}
                    onChange={handleMeetingPointSelect}
                    displayEmpty
                    label=""
                    color="info"
                    fullWidth
                    sx={{margin : "10px"}}
                    inputProps={{
                      style: {
                        textTransform: "capitalize",
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                        fontSize: 20
                      },
                    }}
                  >
                    <MenuItem value="" disabled>Vybrat</MenuItem>
                    <MenuItem value={10}>Praha</MenuItem>
                    <MenuItem value={20}>Brno</MenuItem>
                    <MenuItem value={30}>Plzen</MenuItem>
                  </Select>    
                
                  <FormHeadline text="Zadavatel Dotazu" />  

                  <InputLabel sx={{margin : "10px"}}>Typ Zadavatele Dotazu</InputLabel>    
                  <Select
                    value={meetingPoint}
                    onChange={handleMeetingPointSelect}
                    displayEmpty
                    color="info"
                    fullWidth
                    sx={{margin : "10px"}}
                    inputProps={{
                      style: {
                        textTransform: "capitalize",
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                        fontSize: 20
                      },
                    }}
                  >
                    <MenuItem value="" disabled>Digitální Asistent</MenuItem>
                    <MenuItem value={10}>Možnost 1</MenuItem>
                    <MenuItem value={20}>Možnost 2</MenuItem>
                    <MenuItem value={30}>Možnost 3</MenuItem>
                  </Select>    

                  <TextFieldForm
                    name="nameContactingAuthority"
                    fullWidth
                    id="nameContactingAuthority"
                    label="Jméno Zadavatele"
                    color="info"
                    inputhelper=""
                    sx={{margin : "10px"}}
                    inputProps={{
                      style: {
                        textTransform: "capitalize",
                        WebkitBoxShadow: "0 0 0 1000px white inset",
                        WebkitTextFillColor: "black",
                        fontSize: 20
                      },
                    }}
                    InputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                /> 


             <TextFieldForm
                  name="noteOfContactingAuthority"
                  fullWidth
                  multiline
                  rows={4}
                  id="noteOfContactingAuthority"
                  label="Poznámka Zadavatele"
                  color="info"
                  inputhelper=""
                  sx={{margin : "10px"}}
                  inputProps={{
                    style: {
                      textTransform: "capitalize",
                      WebkitBoxShadow: "0 0 0 1000px white inset",
                      WebkitTextFillColor: "black",
                      fontSize: 20
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
