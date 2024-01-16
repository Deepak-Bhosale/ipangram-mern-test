import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Progress from '../components/Progress/Progress';
import { navigateRoles } from '../config/Constant';
import PrivateLayout from '../Layouts/PrivateLayout/PrivateLayout';

const Login = lazy(() => import("../page/Login"));
const Register = lazy(() => import("../page/Register/Register"));
const Manager = lazy(() => import("../page/manager/Manager"));
const Employee = lazy(() => import("../page/employee/Employee"));

const PrivateRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={navigateRoles.LOGIN} element={
        <Suspense fallback={<div><Progress /></div>}>
            <Login />
        </Suspense>}
      />
    <Route path={navigateRoles.SIGNUP} element={
        <Suspense fallback={<div><Progress /></div>}>
            <Register />
        </Suspense>}
      />
    <Route path={navigateRoles.MANAGER_DASHBOARD} element={
        <Suspense fallback={<div><Progress /></div>}>
          <PrivateLayout>
            <Manager userRole="manager" />
          </PrivateLayout>
        </Suspense>}
      />
    <Route path={navigateRoles.EMPLOYEE_DASHBOARD} element={
        <Suspense fallback={<div><Progress /></div>}>
          <PrivateLayout>
            <Employee userRole="employee"/>
          </PrivateLayout>
        </Suspense>}
      />
    </Routes>
  </BrowserRouter>
  )
}

export default PrivateRoute