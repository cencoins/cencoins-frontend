const fs = require("fs");
const { parsed: envs } = require("dotenv").config({
  path: `.env.${process.env.ENV_FILE}`,
});

const getEnv = () => {
  const { ENV_FILE } = process.env;
  const envFileExists = fs.existsSync(`${process.cwd()}/.env.${ENV_FILE}`);

  if (!envFileExists) {
    throw new Error(`envs not found`);
  }

  return envs;
};

module.exports = getEnv;
