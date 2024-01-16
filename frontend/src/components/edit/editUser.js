import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  editUserValidationSchema,
} from "./helper";
import { content } from "./content";
import { callApi } from "../../utils/api";

const EditUser = (props) => {
  const { userEditDialog, onClose, onSubmit, data = {} } = props;


  let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    role: "",
    isTouched: {},
    error: {},
    isDisabled: true,
  };

  const [editFormValues, setEditFormValues] = useState(initialState);

  const { firstName, lastName, email, location, isTouched, error } =
    editFormValues;

  const handleError = (values) => {
    editUserValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false }
      )
      .then(() => {
        setEditFormValues({
          ...values,
          error: {},
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setEditFormValues({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleOnChange = (field, event) => {
    setEditFormValues({
      ...editFormValues,
      [field]: event.target.value,
    });
    handleError({
      ...editFormValues,
      [field]: event.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...editFormValues,
      isTouched,
    };
    setEditFormValues(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || "";
    }
    return "";
  };

  const handleOnSubmit = async (originalId) => {
    try {
      const response = await callApi({
        method: "PUT",
        url: `http://localhost:7000/api/user/${originalId}`,
        data: { firstName, lastName, email },
      });
      console.log("🚀 ~ file: editUser.js:102 ~ handleOnSubmit ~ response:", response)
      onSubmit();
    } catch (error) {
      console.error("Error in handleOnSubmit:", error);
      onSubmit();
    }
  };

  useEffect(() => {
    setEditFormValues({
      ...initialState,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    });
  }, [data]);

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emptyField = !!(
    editFormValues?.firstName?.length === 0 ||
    editFormValues?.lastName?.length === 0 ||
    editFormValues?.email?.length === 0 ||
    editFormValues?.location?.length === 0 ||
    !regex.test(editFormValues?.email)
  );

  return (
    <Dialog open={userEditDialog}>
      <DialogTitle>{content.EDIT_USER}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content.EDIT_USER_DETAILS}</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="First Name"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.firstName}
              onChange={(event) => handleOnChange("firstName", event)}
              onBlur={(event) => {
                handleOnBlur(event, "firstName");
              }}
              helperText={getError("firstName")}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Last Name"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.lastName}
              onChange={(event) => handleOnChange("lastName", event)}
              onBlur={(event) => {
                handleOnBlur(event, "lastName");
              }}
              helperText={getError("lastName")}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Email Address"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.email}
              onChange={(event) => handleOnChange("email", event)}
              onBlur={(event) => {
                handleOnBlur(event, "email");
              }}
              helperText={() => getError("email")}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Location"
              InputProps={{
                style: {
                  padding: "1px 1px 1px 10px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
              value={editFormValues.location}
              onChange={(event) => handleOnChange("location", event)}
              onBlur={(event) => {
                handleOnBlur(event, "location");
              }}
              helperText={getError("location")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ display: "flex", flexDirection: "row" }}>
        <Button onClick={onClose}>
          {content.CANCEL_BUTTON}
        </Button>
        <Button
          variant="contained"
          // loading={loading}
          onClick={() => handleOnSubmit(data?.originalId)}
          disabled={
            emptyField ||
            (data?.firstName === firstName &&
              data?.lastName === lastName &&
              data?.email === email &&
              data?.lastName === lastName)
          }
        >
          {content.SUBMIT_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditUser.propTypes = {
  userEditDialog: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

EditUser.defaultProps = {
  userEditDialog: false,
  onClose: () => {},
  data: {},
  onSubmit: () => {},
};

export default React.memo(EditUser);
