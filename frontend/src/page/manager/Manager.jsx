import accessPermission from '../../components/HOC/accessPermission';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserContent from './userContent';
import DepartmentContent from './departmentContent';

const Manager = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <><div>Manager Dashboard</div><Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User" value="1" />
            <Tab label="Department" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><UserContent /></TabPanel>
        <TabPanel value="2"><DepartmentContent /></TabPanel>
      </TabContext>
    </Box></>
  );
}

export default accessPermission(Manager);
