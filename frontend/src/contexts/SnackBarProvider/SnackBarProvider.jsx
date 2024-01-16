import React, { useCallback, createContext, useState } from 'react';
import { Snackbar, Alert, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export const SnackBarContext = createContext();

const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('This is default');
  const [status, setStatus] = useState('success');

  const CloseSnackBar = () => {
    setOpen(false);
  };

  const openSnackBar = useCallback((mess, stat) => {
    setOpen(true);
    setMessage(mess);
    setStatus(stat);
  }, []);

  return (
    <SnackBarContext.Provider value={openSnackBar}>
      <Stack spacing={2} sx={{ width: '1085' }}>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={CloseSnackBar}
        >
          <Alert variant="filled" onClose={CloseSnackBar} severity={status} autoHideDuration={2000} sx={{ width: 500 }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
      {children}
    </SnackBarContext.Provider>
  );
};

SnackBarProvider.propTypes = {
  children: PropTypes.string.isRequired,
};
export default SnackBarProvider;
