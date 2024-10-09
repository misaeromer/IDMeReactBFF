const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const IDMEENV_FILE = '.idme.env';

function setEnvironmentVars(envConfig) {
  Object.keys(envConfig).forEach((k) => {
    if (process.env[k] !== envConfig[k]) {
      console.log(`Setting a new value for environment variable "${k}"`);
    }
    process.env[k] = envConfig[k];
  });
}

function getPath(currDir = __dirname) {
  let res, prevDir;
  // stop when find .idme.env file or reach to root dir
  while (!fs.existsSync(res) && currDir !== prevDir)  {
    prevDir = currDir;
    res = path.resolve(currDir, IDMEENV_FILE);
    currDir = path.resolve(currDir, '.');
  }
  return fs.existsSync(res) ? res : null;
}

function setEnvironmentVarsFromTestEnv(currDir) {
  const idmeEnvPath = getPath(currDir);
  if (!idmeEnvPath) {
    return;
  }
  const envConfig = dotenv.parse(fs.readFileSync(idmeEnvPath));
  setEnvironmentVars(envConfig);
}

module.exports = {
  setEnvironmentVarsFromTestEnv
};
