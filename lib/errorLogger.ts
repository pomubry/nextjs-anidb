import { AxiosError } from "axios";

const errorLogger = (error: unknown) => {
  let err = error as AxiosError;
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { data, status, headers } = err.response;
    console.error("API error message:", data);
    console.error("API error status:", status);
    console.error("API error headers:", headers);
  } else if (err.request) {
    // The request was made but no response was received
    // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(
      "The request was made but no response was received:",
      err.request
    );
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", err.message);
  }
};

export default errorLogger;
