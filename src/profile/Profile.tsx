import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import {
  CircularProgress,
  FormHelperTextProps,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
// import CustomSnackBar from "../../materialComponents/snackbar/CustomSnackBar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { businessProfileService } from "../axiosConfig/AxiosInstance";
import CustomSnackBar from "../common/CustomSnackBar";

interface UserData {
  compnayName: string;
  legalName: string;
  legalAddress: string;
  email: string;
  website: string;
  businessAddress: BusinessAddress;
  taxIdentifier: TaxIdentifier;
}
interface BusinessAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
interface TaxIdentifier {
  pan: string;
  etl: string;
}
const CustomPaper = styled(Paper)(({}) => ({}));

var registerData: { [key: string]: string } = {
  compnayName: "",
  legalName: "",
  legalAddress: "",
  email: "",
  website: "",
  "business.city": "",
  "business.country": "",
  "business.line1": "",
  "business.line2": "",
  "business.state": "",
  "business.zip": "",
  "tax.pan": "",
  "tax.etl": "",
};

export default function Profile() {
  const [valid, setValid] = useState<{ [key: string]: boolean }>();

  const [registerUser, setUserData] = useState<{ [key: string]: string }>(
    registerData
  );
  const [submited, setSubmited] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const inputFormData = [
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "compnayName",
      lable: "Company Name",
      helperText: "Please Enter Company Name",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "legalName",
      lable: "Legal Name",
      helperText: "Please Enter Legal Name",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "legalAddress",
      type: "text",
      lable: "Legal Address",
      helperText: "Please Legal address",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "email",
      lable: "email",
      helperText: "Please Enter Email",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "website",
      lable: "Website",
      helperText: "Please Enter Website",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "business.line1",
      lable: "Business Line1",
      helperText: "Please Enter Line1",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "business.line2",
      lable: "Business Line2",
      helperText: "Please Enter Line2",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "business.city",
      lable: "Business city",
      helperText: "Please Enter City",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "business.state",
      lable: "Business State",
      helperText: "Please Enter State",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "business.zip",
      lable: "Business zip",
      helperText: "Please Enter Zip",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "business.country",
      lable: "Business Country",
      helperText: "Please Enter Country",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "tax.pan",
      lable: " PAN Number",
      helperText: "Please Enter PAN Number",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
    {
      width: { md: 5.7, sm: 12, xs: 12 },
      fieldName: "tax.etl",
      lable: " ETL Number",
      helperText: "Please Enter ETL",
      required: true,
      startAdorment: (
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      ),
    },
  ];

  const [signUp, setStatus] = useState({
    error: false,
    message: "",
  });

  const resetError = () => {
    setStatus({ error: false, message: "" });
  };

  const validateInput = (data: { [key: string]: string }) => {
    console.log("data>>>>", data);
    var isValid: boolean = true;
    var validatedLog: { [key: string]: boolean } = valid ? { ...valid } : {};
    Object.entries(data).forEach(([key, value]) => {
      if (!value || value.length === 0) {
        validatedLog[key] = false;
        isValid = false;
      } else {
        validatedLog[key] = true;
        if (isValid) {
          return true;
        }
      }
    });
    setValid(validatedLog);
    return isValid;
  };
  const handleSubmit = () => {
    console.log("validating>>>", registerUser);
    const isValid = validateInput(registerUser);
    console.log("--------", isValid);
    setSubmited(true);

    if (isValid) register();
  };

  const register = () => {
    setDisabled(true);
    let payload: UserData = {
      compnayName: registerUser["compnayName"],
      legalName: registerUser["legalName"],
      legalAddress: registerUser["legalAddress"],
      email: registerUser["email"],
      website: registerUser["website"],
      businessAddress: {
        line1: registerUser["business.line1"],
        line2: registerUser["business.line2"],
        city: registerUser["business.city"],
        state: registerUser["business.city"],
        zip: registerUser["business.zip"],
        country: registerUser["business.country"],
      },
      taxIdentifier: {
        pan: registerUser["tax.pan"],
        etl: registerUser["tax.etl"],
      },
    };
    console.log("calling.............");
    businessProfileService
      .post("/v1/customer", payload)
      .then((response: any) => {
        console.log(response);
        let userData = response.data;
        setUserData(registerData);
        setValid(undefined);
      })
      .catch((error: any) => {
        setDisabled(false);
        console.log(error);
        setStatus({ error: true, message: error.response?.data });
      });
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      // sx={{
      //   background:
      //     "linear-gradient(-20deg, #fa7c30 20%, rgba(0, 0, 0, 0) 20%)",
      // }}
    >
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} /> */}
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={6}
        justifyContent="space-between"
        alignItems="flex-start"
        component={CustomPaper}
        elevation={0}
        square={false}
      >
        <Grid container>
          <Grid item xs>
            <Avatar
              style={{ float: "left" }}
              sx={{ bgcolor: "whitesmoke", color: "black" }}
            >
              U
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              maxWidth={150}
              marginTop={"5px"}
            >
              Register
            </Typography>
          </Grid>
          <Grid item xl>
            <CustomSnackBar
              message={`Failed to Register, ${signUp.message}`}
              handleClose={resetError}
              open={signUp.error}
              vertical={"top"}
              horizontal={"center"}
              type={"alert"}
              severity={"error"}
              autoHideDuration={6000}
              style={{ top: 100 }}
            ></CustomSnackBar>
          </Grid>
        </Grid>
        {/* <Grid md={12} sm={12} xs={12}> */}
        {inputFormData.map((item) => (
          <Grid
            md={item.width?.md || 12}
            sm={item.width?.sm || 12}
            xs={item.width?.xs || 12}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required={item.required}
              fullWidth
              id={item.fieldName}
              error={valid && !valid[item.fieldName]}
              type={item.type ? item.type : "text"}
              //  helperText={!valid[String(item.fieldName)] ? {item.helperText} : ""}
              label={item.lable}
              name={item.fieldName}
              //  autoComplete="email"
              autoComplete={item.fieldName}
              onChange={(event) => {
                // registerData[item.fieldName] = event.target.value;
                setUserData({
                  ...registerUser,
                  [item.fieldName]: event.target.value,
                });
                if (submited) {
                  validateInput(registerUser);
                }
              }}
            />
          </Grid>
        ))}
        {/* </Grid> */}
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          disabled={disabled}
          onClick={handleSubmit}
          endIcon={disabled ? <CircularProgress size={13} /> : <></>}
        >
          Submit
        </Button>
        {/* <Box mt={5}>
          <Copyright />
        </Box> */}
      </Grid>
    </Grid>
  );
}
