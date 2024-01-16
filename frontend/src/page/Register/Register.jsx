import React, { useState } from 'react';

import {
  Button,
  Paper,
  Grid,
  InputAdornment,
  TextField,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { callApi } from '../../utils/api';
import validationSchema from './Yup';

const Register = () => {
  const [formValue, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    location: '',
    password: '',
    isTouched: {},
    error: {},
  });
  const {
    firstName,
    lastName,
    email,
    role,
    location,
    isTouched,
    error,
    password,
  } = formValue;

  const navigation = useNavigate();

  const handleError = (values) => {
    validationSchema
      .validate(
        {
          firstName,
          lastName,
          email,
          role,
          location,
          password,
        },
        { abortEarly: false }
      )
      .then(() => {
        setFormValues({
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
          setFormValues({
            ...values,
            error: schemaErrors,
          });
        }
      });
  };

  const handleFirstNameChange = (e) => {
    setFormValues({
      ...formValue,
      firstName: e.target.value,
    });
    handleError({
      ...formValue,
      firstName: e.target.value,
    });
  };

  const handleLastNameChange = (e) => {
    setFormValues({
      ...formValue,
      lastName: e.target.value,
    });
    handleError({
      ...formValue,
      lastName: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setFormValues({
      ...formValue,
      email: e.target.value,
    });
    handleError({
      ...formValue,
      email: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setFormValues({
      ...formValue,
      role: e.target.value,
    });
    handleError({
      ...formValue,
      role: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setFormValues({
      ...formValue,
      password: e.target.value,
    });
    handleError({
      ...formValue,
      password: e.target.value,
    });
  };

  const handleOnBlur = (event, type) => {
    isTouched[type] = true;
    const newValue = {
      ...formValue,
      isTouched,
    };
    setFormValues(newValue);
    handleError(newValue);
  };

  const getError = (type) => {
    if (isTouched[type]) {
      return error[type] || '';
    }
    return '';
  };

  const handleClickShowPassword = () => {
    setFormValues({
      ...formValue,
      showPassword: !formValue.showPassword,
    });
  };

  const onSubmit = async () => {
    try {
      await callApi({
        method: 'POST',
        url: 'http://localhost:7000/api/user',
        data: {
          firstName,
          lastName,
          email,
          role,
          password,
        },
      });

      navigation('/', {
        replace: true,
      });
    } catch (error) {
      // Handle errors here, maybe display an error message
      console.error('Error during form submission:', error);
      // openSnackBar(`${email} cannot register`, 'error');
    }
    return '';
  };

  const hasErrors = (errors) => Object.keys(errors).length !== 0;
  const hasTouched = (touched) => Object.keys(touched).length !== 0;

  const paperStyle = {
    padding: 20,
    height: 'auto',
    width: 350,
    margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>Register</h2>
          </Grid>
          <TextField
            size="small"
            variant="standard"
            fullWidth
            required
            label="First Name"
            onChange={handleFirstNameChange}
            value={firstName}
            type="text"
            placeholder="First Name"
            onBlur={(event) => {
              handleOnBlur(event, 'firstName');
            }}
            error={getError('firstName')}
            helperText={getError('firstName')}
          />
          <TextField
            size="small"
            variant="standard"
            fullWidth
            required
            label="Last Name"
            onChange={handleLastNameChange}
            value={lastName}
            type="text"
            placeholder="Last Name"
            onBlur={(event) => {
              handleOnBlur(event, 'lastName');
            }}
            error={getError('lastName')}
            helperText={getError('lastName')}
          />
          <TextField
            size="small"
            variant="standard"
            fullWidth
            required
            label="Email"
            onChange={handleEmailChange}
            value={email}
            type="text"
            placeholder="Email"
            onBlur={(event) => {
              handleOnBlur(event, 'email');
            }}
            error={getError('email')}
            helperText={getError('email')}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              fullWidth
              value={role}
              onChange={handleRoleChange}
              label="Role"
              required
              placeholder="Role"
              onBlur={(event) => {
                handleOnBlur(event, 'role');
              }}
              error={getError('role')}
              helperText={getError('role')}
            >
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <TextField
            style={{ marginTop: '15px' }}
            size="small"
            variant="standard"
            fullWidth
            required
            label="Password"
            onChange={handlePasswordChange}
            value={password}
            type={formValue.showPassword ? 'text' : 'password'}
            placeholder="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formValue.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={(event) => {
              handleOnBlur(event, 'password');
            }}
            error={getError('password')}
            helperText={getError('password')}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '15px',
            }}
          >
            <Button style={{ marginRight: '10px' }} variant="contained">
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Go back
              </Link>
            </Button>
            <Button
              variant="contained"
              onClick={(event) => {
                onSubmit();
                event.preventDefault();
              }}
              disabled={hasErrors(error) || !hasTouched(isTouched)}
            >
              Register
            </Button>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};
export default Register;
