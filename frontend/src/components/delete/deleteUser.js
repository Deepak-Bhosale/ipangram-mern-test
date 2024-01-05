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

const DeleteUser = (props) => {
  const { onClose, userRemoveDialog, data, onSubmit } = props;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOnSubmit = async (originalId) => {
    try {
      setLoading(true);
      const response = await callApi({
        method: 'DELETE',
        url: `http://localhost:7000/api/user/${originalId}`,
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
    <Dialog open={userRemoveDialog} onClose={onClose}>
      <DialogTitle>{content.DELETE_USER}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content.DO_YOU_REALLY_WANT_TO_DELETE_USER}
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

DeleteUser.propTypes = {
  userRemoveDialog: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

DeleteUser.defaultProps = {
  userRemoveDialog: false,
  onClose: () => {},
  data: {},
  onSubmit: () => {},
};

export default DeleteUser;
