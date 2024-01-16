import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { editUserValidationSchema } from './helper';
import { content } from './content';
import { callApi } from '../../utils/api';

const EditDepartment = (props) => {
  const { departmentEditDialog, onClose, onSubmit, data = {} } = props;

  let initialState = {
    name: '',
    isTouched: {},
    error: {},
    isDisabled: true,
  };

  const [editFormValues, setEditFormValues] = useState(initialState);

  const { name, isTouched, error } = editFormValues;

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
      return error[type] || '';
    }
    return '';
  };

  const handleOnSubmit = async (originalId) => {
    try {
      const response = await callApi({
        method: 'PUT',
        url: `http://localhost:7000/api/department/${originalId}`,
        data: { name },
      });
      onSubmit();
    } catch (error) {
      console.error('Error in handleOnSubmit:', error);
      onSubmit();
    }
  };

  useEffect(() => {
    setEditFormValues({
      ...initialState,
      name: data?.name,
    });
  }, [data]);

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emptyField = !!(editFormValues?.name?.length === 0);

  return (
    <Dialog open={departmentEditDialog}>
      <DialogTitle>{content.EDIT_USER}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content.EDIT_USER_DETAILS}</DialogContentText>
        <Grid container>
          <Grid item xs={11.64}>
            <TextField
              sx={{ m: 1 }}
              id="outlined-basic"
              fullWidth
              label="Name"
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
              value={editFormValues.name}
              onChange={(event) => handleOnChange('name', event)}
              onBlur={(event) => {
                handleOnBlur(event, 'name');
              }}
              helperText={getError('name')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ display: 'flex', flexDirection: 'row' }}>
        <Button onClick={onClose}>{content.CANCEL_BUTTON}</Button>
        <Button
          variant="contained"
          // loading={loading}
          onClick={() => handleOnSubmit(data?.originalId)}
          disabled={emptyField || data?.name === name}
        >
          {content.SUBMIT_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditDepartment.propTypes = {
  departmentEditDialog: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

EditDepartment.defaultProps = {
  departmentEditDialog: false,
  onClose: () => {},
  data: {},
  onSubmit: () => {},
};

export default React.memo(EditDepartment);
