import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Paper,
  Grid,
  InputAdornment,
  Box,
  TextField,
  Typography,
  Avatar,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Lock';
import { callApi } from '../../utils/api';
import { SnackBarContext } from '../../contexts';
import validationSchema from './Yup';

const Login = () => {
  const [formValue, setFormValues] = useState({
    email: '',
    password: '',
    isTouched: {},
    error: {},
  });
  const { email, isTouched, error, password } = formValue;
  const openSnackBar = useContext(SnackBarContext);
  const [Authentication, setAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (values) => {
    validationSchema
      .validate(
        {
          email,
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
      const response = await callApi({
        method: 'POST',
        url: 'http://localhost:7000/api/user/generateToken',
        data: {
          email,
          password,
        },
      });

      setAuthentication(true);
      localStorage.setItem('token', response?.data?.data?.token);
      localStorage.setItem('role', response?.data?.data?.userRole);
      localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
      const message = `${email} logged in successfully`;
      // openSnackBar(message, "success");
    } catch (error) {
      setIsLoading(false);
      const message = `${email} cannot login`;
      // openSnackBar(message, "error");
    }
  };

  const hasErrors = (errors) => Object.keys(errors).length !== 0;
  const hasTouched = (touched) => Object.keys(touched).length !== 0;

  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthentication(true);
      navigation(`${localStorage.getItem('role').toLowerCase()}`, {
        replace: true,
      });
    } else {
      navigation('/', { replace: true });
    }
  }, [navigation, Authentication, openSnackBar]);

  const paperStyle = {
    padding: 20,
    height: '50vh',
    width: 350,
    margin: '20px auto',
  };

  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0', marginTop: '10px' };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockIcon />
            </Avatar>
            <h2>LogIn</h2>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
            <TextField
              onChange={handleEmailChange}
              value={email}
              type="text"
              label="Email"
              fullWidth
              variant="standard"
              required
              placeholder="Email"
              onBlur={(event) => {
                handleOnBlur(event, 'email');
              }}
              error={getError('email')}
              helperText={getError('email')}
            />
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'flex-end', marginTop: '10px' }}
          >
            <PasswordIcon sx={{ color: 'action.active', mr: 1 }} />
            <TextField
              fullWidth
              required
              onChange={handlePasswordChange}
              value={password}
              type={formValue.showPassword ? 'text' : 'password'}
              label="Password"
              variant="standard"
              placeholder="Password"
              onBlur={(event) => {
                handleOnBlur(event, 'password');
              }}
              error={getError('password')}
              helperText={getError('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {formValue.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <LoadingButton
            loading={isLoading}
            style={btnstyle}
            type="submit"
            fullWidth
            variant="contained"
            onClick={(event) => {
              onSubmit();
              event.preventDefault();
              setIsLoading(true);
            }}
            disabled={hasErrors(error) || !hasTouched(isTouched)}
          >
            Login
          </LoadingButton>
          <Typography>
            {' '}
            Do you have an account ?
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: 'red' }}
            >
              Register
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};
export default Login;
