export default function () {
  let idmeEnv;
  try {
    idmeEnv = require('@idme/env');
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      // try local env module
      idmeEnv = require('./idme-env');
      return idmeEnv;
    }

    throw err;
  }

  return idmeEnv;
}
