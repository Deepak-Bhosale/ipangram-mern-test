import axios from "axios";

export const callApi = ({
  method = "",
  url = "http://localhost:7000",
  headers = {},
  data = {},
  params = {},
}) => {
  try {
    return axios({
      method,
      url,
      headers,
      data,
      params,
    });
  } catch (error) {
    console.log(error)
    return error;
  }
};
