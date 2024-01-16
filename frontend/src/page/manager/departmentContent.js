import React, { lazy, useEffect, useState } from 'react';
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
  Tooltip,
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import {
  addDepartmentState,
  addDepartmentValidationSchema,
  departmentTableColumn,
} from './helper';
import { content } from './content';
import { callApi } from '../../utils/api';

const GenericTable = lazy(() => import('../../components/table/genericTable'));


const EditIcon = () => (
  <Tooltip title="Edit Department">
    <Edit />
  </Tooltip>
);

const DeleteIcon = () => (
  <Tooltip title="Delete Department">
    <Delete />
  </Tooltip>
);

const DepartmentContent = () => {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [addDepartment, setAddDepartment] = useState(addDepartmentState);
  const [departmentTableData, setDepartmentTableData] = useState([]);
  const [departmentEditDialog, setDepartmentEditDialog] = useState(false);
  const [departmentRemoveDialog, setDepartmentRemoveDialog] = useState(false);
  const [filterData, setFilterdata] = useState('');
  const [order, setSortOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('status');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const handleOnSort = (value) => {
    setOrderBy(value);
    const tableDataSort = handleOnTableDataSort(orderBy, order);
    departmentTableData.sort(tableDataSort);
    if (order === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  };

  const { isTouched, error, isDisabled } = addDepartment;

  const handleError = (values) => {
    addDepartmentValidationSchema
      .validate(
        {
          ...values,
        },
        { abortEarly: false }
      )
      .then(() => {
        setAddDepartment({
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
          setAddDepartment({
            ...values,
            isDisabled: true,
            error: schemaErrors,
          });
        }
      });
  };

  const handleOnChange = (field, event) => {
    const temp = {
      ...addDepartment,
      isTouched: { ...addDepartment.isTouched, [field]: true },
      [field]: event.target.value,
    };
    setAddDepartment(temp);
    handleError(temp);
  };

  const handleOnBlur = (event, type) => {
    const { value } = event.target;
    if (value === '') {
      isTouched[type] = true;
      const newValue = {
        ...addDepartment,
        isTouched,
      };
      setAddDepartment(newValue);
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
        name: addDepartment.department,
      };
      const output = await callApi({
        method: 'POST',
        url: 'http://localhost:7000/api/department',
        data: input,
      });

      if (output?.data?.data?.status === 200) {
        setisDialogOpen(false);
        snackBar('Successfully Added User', 'success');
      } else {
        console.log('CATCH BLOCK : in addSingUser.js .then => ');
        setisDialogOpen(false);
      }
    } catch (error) {
      console.log('CATCH BLOCK : in addSingUser.js .then => ', error);
      setisDialogOpen(false);
    }
  };

  const handleOnCancel = () => {
    setisDialogOpen(false);
    setAddDepartment(addDepartmentState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi({
          method: 'GET',
          url: 'http://localhost:7000/api/department/allDepartmentsData',
        });
        console.log(
          '🚀 ~ file: departmentContent.js:152 ~ fetchData ~ response:',
          response
        );
        setDepartmentTableData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button variant="outlined" onClick={() => setisDialogOpen(true)}>
          Add Department
        </Button>
      </div>
      <Dialog open={isDialogOpen}>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Department Details</DialogContentText>
          <Grid container>
            <Grid item xs={11.64}>
              <TextField
                sx={{ m: 1 }}
                id="outlined-basic"
                fullWidth
                label="Department"
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
                onChange={(event) => handleOnChange('department', event)}
                onBlur={(event) => {
                  handleOnBlur(event, 'department');
                }}
                error={Boolean(getError('department'))}
                helperText={getError('department')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOnCancel()}>
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

      <div
        style={{
          margin: '1rem',
          border: '1px solid #BDBDBD',
          borderRadius: '5px',
        }}
      >
        <GenericTable
          columns={departmentTableColumn}
          data={departmentTableData || []}
          actions={[
            {
              Icon: EditIcon,
              handler: () => setDepartmentEditDialog(true),
            },
            {
              Icon: DeleteIcon,
              handler: () => setDepartmentRemoveDialog(true),
            },
          ]}
          departmentEditDialog={departmentEditDialog}
          departmentRemoveDialog={departmentRemoveDialog}
          handleOnDepartmentEditDialog={() => setDepartmentEditDialog(false)}
          handleOnDepartmentRemoveDialog={() => setDepartmentRemoveDialog(false)}
          order={order}
          orderBy={orderBy}
          handleOnSort={handleOnSort}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </div>
    </>
  );
};

export default DepartmentContent;
