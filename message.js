// eslint-disable-next-line import/prefer-default-export
export const requestResponse = {
  success: (data) => ({
    success: true,
    message: data,
  }),
  failed: (data) => ({
    success: false,
    message: data,
  }),
  successWithData: (data) => ({
    success: true,
    message: 'Data has been loaded',
    data,
  }),
  successLogin: (data) => ({
    success: true,
    message: 'Login Success',
    data,
  }),
  serverError: (data) => ({
    success: false,
    message: data,
  }),
};
