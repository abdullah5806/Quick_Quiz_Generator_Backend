const sendResponse = (
  res,
  statusCode,
  success,
  message,
  data = null,
  token = null
) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (token !== null) {
    response.token = token;
  }

  return res.status(statusCode).json(response);
};

export default sendResponse;
