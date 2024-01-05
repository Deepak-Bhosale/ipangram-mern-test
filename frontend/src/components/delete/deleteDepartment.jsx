import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { content } from './content';
import { callApi } from '../../utils/api';

const DeleteDepartment = (props) => {
  const { onClose, departmentRemoveDialog, data, onSubmit } = props;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOnSubmit = async (originalId) => {
    try {
      setLoading(true);
      const response = await callApi({
        method: 'DELETE',
        url: `http://localhost:7000/api/department/${originalId}`,
      });
      if (response?.data?.data?.status === 200) {
        setAuthenticated(true);
      }
      onSubmit();
      setLoading(false);
    } catch (err) {
      console.log('CATCH BLOCK : deleteUser.js : handleOnSubmit => ', err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setAuthenticated(true);
    }
  }, [navigate, authenticated]);

  return (
    <Dialog open={departmentRemoveDialog} onClose={onClose}>
      <DialogTitle>Delate Department</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want to delete department ?
        </DialogContentText>
        <br />
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {content.CANCEL}
          </Button>
          <Button
            variant="contained"
            loading={loading}
            onClick={() => handleOnSubmit(data.originalId)}
          >
            {content.DELETE}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

DeleteDepartment.propTypes = {
  departmentRemoveDialog: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

DeleteDepartment.defaultProps = {
  departmentRemoveDialog: false,
  onClose: () => {},
  data: {},
  onSubmit: () => {},
};

export default DeleteDepartment;
