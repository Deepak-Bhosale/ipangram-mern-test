import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Edit, Delete, Search } from '@mui/icons-material';
import { Button, CircularProgress, Tooltip, Typography } from '@mui/material';
import { content } from './content';
import { userManagementTableColumn } from './helper';
import { callApi } from "../../utils/api";

const GenericTable = lazy(() => import('../../components/table/genericTable'));
const AddSingleUser = lazy(() => import('./addSingleUser'));

const EditIcon = () => (
  <Tooltip title="Edit User">
    <Edit />
  </Tooltip>
);

const DeleteIcon = () => (
  <Tooltip title="Delete User">
    <Delete />
  </Tooltip>
);

const UserContent = () => {
  const [userTableData, setUserTableData] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [userEditDialog, setUserEditDialog] = useState(false);
  const [userRemoveDialog, setUserRemoveDialog] = useState(false);
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
    userTableData.sort(tableDataSort);
    if (order === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callApi({
          method: "GET",
          url: "http://localhost:7000/api/user/allUsersData",
        });
        setUserTableData(response?.data?.data);
      } catch (error) {
        // Handle errors, maybe set a default value for setUserTableData or show an error message
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <AddSingleUser
          open={isDialogOpen}
          onClose={() => setisDialogOpen(false)}
          onSubmit={() => setisDialogOpen(false)}
        />
      </Suspense>
      <Suspense fallback={<CircularProgress />}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem',
          }}
        >
          <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>
            {content.USER_TABLE}
          </Typography>
          <div style={{ display: 'flex' }}>
            {/* <SearchBar>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                id="outlined-basic"
                label="search"
                variant="outlined"
                placeholder={content.USER_NAME}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => {
                  setFilterdata(event.target.value.trim());
                }}
              />
            </SearchBar> */}
            <Button
              // style={getButtonStyles(theme, darkMode)}
              onClick={() => setisDialogOpen(true)}
            >
              {content.ADD_USER}
            </Button>
          </div>
        </div>
        <div
          style={{
            margin: '1rem',
            border: '1px solid #BDBDBD',
            borderRadius: '5px',
          }}
        >
          <GenericTable
            content='user'
            columns={userManagementTableColumn}
            data={userTableData || []}
            actions={[
              {
                Icon: EditIcon,
                handler: () => setUserEditDialog(true),
              },
              {
                Icon: DeleteIcon,
                handler: () => setUserRemoveDialog(true),
              },
            ]}
            userEditDialog={userEditDialog}
            userRemoveDialog={userRemoveDialog}
            handleOnUserEditDialog={() => setUserEditDialog(false)}
            handleOnUserRemoveDialog={() => setUserRemoveDialog(false)}
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
      </Suspense>
    </>
  );
};

export default UserContent;
