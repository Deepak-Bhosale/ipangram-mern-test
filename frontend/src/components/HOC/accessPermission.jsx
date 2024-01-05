/* eslint-disable react/prop-types */
import React from "react";

const accessPermission = (Component) => (props) => {
  const { userRole } = props;
  const originalRole = localStorage.getItem("role").toLowerCase();

  return <>{originalRole === userRole ? <Component /> : "unAuthorised"}</>;
};
export default accessPermission;
