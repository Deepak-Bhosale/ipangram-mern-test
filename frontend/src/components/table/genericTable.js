import React, { lazy, Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TablePagination,
  TableCell,
  TableSortLabel,
  Button,
  CircularProgress,
} from '@mui/material';
import { tableStyles } from './style';
import EditDepartment from '../edit/editDepartment';
import DeleteDepartment from '../delete/deleteDepartment';

const EditUser = lazy(() => import('../edit/editUser'));
const DeleteUser = lazy(() => import('../delete/deleteUser'));

const GenericTable = (props) => {
  const {
    content,
    data,
    actions,
    columns,
    order,
    orderBy,
    handleOnSort,
    page,
    onPageChange,
    rowsPerPage,
    onRowsPerPageChange,
    rowsPerPageOptions,
    userEditDialog,
    userRemoveDialog,
    handleOnUserRemoveDialog,
    handleOnUserEditDialog,
    departmentEditDialog,
    departmentRemoveDialog,
    handleOnDepartmentRemoveDialog,
    handleOnDepartmentEditDialog,
  } = props;

  const [oldData, setOldData] = useState({});

  const handleOnOldData = (dataItem) => {
    setOldData(dataItem);
  };

  return (
    <>
      {content === 'user' ? (
        <>
          <Suspense fallback={<CircularProgress />}>
            <EditUser
              userEditDialog={userEditDialog}
              onClose={handleOnUserEditDialog}
              onSubmit={handleOnUserEditDialog}
              data={oldData}
            />
          </Suspense>
          <Suspense fallback={<CircularProgress />}>
            <DeleteUser
              userRemoveDialog={userRemoveDialog}
              onClose={handleOnUserRemoveDialog}
              onSubmit={handleOnUserRemoveDialog}
              data={oldData}
            />
          </Suspense>
        </>
      ) : (
        <>
          <Suspense fallback={<CircularProgress />}>
            <EditDepartment
              departmentEditDialog={departmentEditDialog}
              onClose={handleOnDepartmentEditDialog}
              onSubmit={handleOnDepartmentEditDialog}
              data={oldData}
            />
          </Suspense>
          <Suspense fallback={<CircularProgress />}>
            <DeleteDepartment
              departmentRemoveDialog={departmentRemoveDialog}
              onClose={handleOnDepartmentRemoveDialog}
              onSubmit={handleOnDepartmentRemoveDialog}
              data={oldData}
            />
          </Suspense>
        </>
      )}
      <TableContainer style={tableStyles.tableContainer}>
        <Table style={tableStyles.table}>
          <TableHead>
            <TableRow>
              {columns.map(({ label, value }, i) => (
                <TableCell
                  align="center"
                  style={tableStyles.tableCell}
                  key={`columns${i + 1}`}
                >
                  <TableSortLabel
                    active={orderBy === value}
                    direction={orderBy === value ? order : 'asc'}
                    onClick={() => handleOnSort(value)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dataItem, index) => (
                <TableRow
                  align="center"
                  style={tableStyles.tableRow}
                  key={`data${index + 1}`}
                  onClick={() =>
                    dataItem?.url
                      ? window.open(dataItem?.url, '_blank', 'noreferrer')
                      : ''
                  }
                >
                  {columns.map(({ value, format }, iconColIndex) =>
                    value === 'Icon' ? (
                      <TableCell
                        style={tableStyles.tableRow}
                        align="center"
                        key={`iconColIndex${iconColIndex + 1}`}
                      >
                        {actions?.map(({ Icon, handler }, iconIndex) => (
                          <Button
                            color="inherit"
                            style={{ marginTop: '5px' }}
                            key={`icon${iconIndex + 1}`}
                            align="center"
                            onClick={() => {
                              handler();
                              handleOnOldData(dataItem);
                            }}
                          >
                            <Icon
                              style={{ padding: '10px -1px -2px -1px' }}
                              variant="contained"
                              onClick={() => {}}
                              data={dataItem}
                              index={index}
                            />
                          </Button>
                        ))}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={`iconColIndex${iconColIndex + 1}`}
                        align="center"
                        style={tableStyles.tableRow}
                      >
                        {format ? format(dataItem[value]) : dataItem[value]}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          align="right"
          component="div"
          count={data?.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </TableContainer>
    </>
  );
};

GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(PropTypes.object),
  order: PropTypes.string,
  orderBy: PropTypes.string,
  handleOnSort: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  userEditDialog: PropTypes.bool,
  userRemoveDialog: PropTypes.bool,
  handleOnUserRemoveDialog: PropTypes.func,
  handleOnUserEditDialog: PropTypes.func,
};

GenericTable.defaultProps = {
  data: [],
  columns: [],
  actions: [],
  order: 'ase',
  orderBy: '',
  page: 0,
  rowsPerPage: 0,
  rowsPerPageOptions: [],
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
  handleOnSort: () => {},
  userEditDialog: false,
  userRemoveDialog: false,
  handleOnUserRemoveDialog: () => {},
  handleOnUserEditDialog: () => {},
};

export default GenericTable;
