import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import Button from "@mui/material/Button";

function DoctorForm({onFinish, initialvalues}) {

  return (
    <div>
      <Box
        component="form"
        onSubmit={onFinish}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField required id="firstName" label="First Name" defaultValue={initialvalues?.firstName || ""}/>
          <TextField required id="lastName" label="Last Name" defaultValue={initialvalues?.lastName || ""}/>
          <TextField required id="email" label="Email" defaultValue={initialvalues?.email || ""}/>
          <TextField required id="phoneNumber" label="Phone Number" defaultValue={initialvalues?.phoneNumber || ""}/>
          <TextField required id="address" label="Address" defaultValue={initialvalues?.address || ""}/>
          <TextField required id="specialization" label="Specialization" defaultValue={initialvalues?.specialization || ""}/>
          <TextField
            id="experience"
            label="Experience"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={initialvalues?.experience || ""}
          />
          <TextField
            id="feePerConsultation"
            label="Fee per Consultation"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={initialvalues?.feePerConsultation || ""}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["SingleInputTimeRangeField"]}>
              <SingleInputTimeRangeField id="timings" label="From - To" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default DoctorForm;
