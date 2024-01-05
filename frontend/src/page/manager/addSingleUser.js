import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  InputAdornment,
  Divider,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  addUserState,
  addUserValidationSchema,
} from './helper';
import { content } from './content';
import { callApi } from "../../utils/api";

const AddSingleUser = (props) => {
  const { onClose, onSubmit, open } = props;

  const [addUserFormValue, setAddUserFormValues] = useState(addUserState);
  const { isTouched, error, isDisabled } = addUserFormValue;

  const handleError = (values) => {
    addUserValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false }
      )
      .then(() => {
        setAddUserFormValues({
          ...values,
          isDisabled: false,
          error: {},
        });
      })
      .catch((allErrors) => {
        const schemaErrors = {};
        if (allErrors) {
          allErrors.inner.forEach((err) => {
            schemaErrors[err.path] = err.message;
          });
          setAddUserFormValues({
            ...values,
            isDisabled: true,
            error: schemaErrors,
          });
        }
      });
  };

  const handleOnChange = (field, event) => {
    const temp = {
      ...addUserFormValue,
      isTouched: { ...addUserFormValue.isTouched, [field]: true },
      [field]: event.target.value,
    };
    setAddUserFormValues(temp);
    handleError(temp);
  };

  const handleOnBlur = (event, type) => {
    const { value } = event.target;
    if (value === '') {
      isTouched[type] = true;
      const newValue = {
        ...addUserFormValue,
        isTouched,
      };
      setAddUserFormValues(newValue);
      handleError(newValue);
    }
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const handleOnSubmit = async () => {
    try {
      const input = {
        firstName: addUserFormValue.firstName,
        lastName: addUserFormValue.lastName,
        email: addUserFormValue.email,
        password: addUserFormValue.password,
        location: addUserFormValue.location,
        role: 'employee',
      };
      const output = await callApi({
        method: 'POST',
        url: 'http://localhost:7000/api/user',
        data: input
      });

      if (output?.data?.data?.status === 200) {
        onSubmit();
        snackBar('Successfully Added User', 'success');
      } else {
        console.log('CATCH BLOCK : in addSingUser.js .then => ');
        onSubmit();
      }
    } catch (error) {
      console.log('CATCH BLOCK : in addSingUser.js .then => ', error);
      onSubmit();
    }
  };

  const handleOnCancel = () => {
    onClose();
    setAddUserFormValues(addUserState);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{content.ADD_USER}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content.ENTER_USER_DETAILS}</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="First Name"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => handleOnChange('firstName', event)}
              onBlur={(event) => {
                handleOnBlur(event, 'firstName');
              }}
              error={Boolean(getError('firstName'))}
              helperText={getError('firstName')}
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
                  padding: '1px 1px 1px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => handleOnChange('lastName', event)}
              onBlur={(event) => {
                handleOnBlur(event, 'lastName');
              }}
              error={Boolean(getError('lastName'))}
              helperText={getError('lastName')}
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
                  padding: '1px 1px 1px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => handleOnChange('email', event)}
              onBlur={(event) => {
                handleOnBlur(event, 'email');
              }}
              error={Boolean(getError('email'))}
              helperText={getError('email')}
            />
          </Grid>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Password"
              InputProps={{
                style: {
                  padding: '1px 1px 1px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <VisibilityIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => handleOnChange('password', event)}
              onBlur={(event) => {
                handleOnBlur(event, 'password');
              }}
              error={Boolean(getError('password'))}
              helperText={getError('password')}
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
                  padding: '1px 1px 1px 10px',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(event) => handleOnChange('location', event)}
              onBlur={(event) => {
                handleOnBlur(event, 'location');
              }}
              error={Boolean(getError('location'))}
              helperText={getError('location')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleOnCancel()}
        >
          {content.CANCEL_BUTTON}
        </Button>
        <Button
          variant="contained"
          onClick={() => handleOnSubmit()}
          disabled={isDisabled}
        >
          {content.SUBMIT_BUTTON}
        </Button>
        <Divider />
      </DialogActions>
    </Dialog>
  );
};

AddSingleUser.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

AddSingleUser.defaultProps = {
  open: false,
  onClose: () => {},
  onSubmit: () => {},
};

export default React.memo(AddSingleUser);
