const fs = require("fs");
const { parsed: envs } = require("dotenv").config({
  path: `.env.${process.env.ENV_FILE}`,
});

const getEnv = () => {
  const { NODE_ENV, ENV_FILE } = process.env;
  const env = NODE_ENV !== "production" ? envs : process.env;
  const envFileExists = fs.existsSync(`${process.cwd()}/.env.${ENV_FILE}`);

  if (NODE_ENV !== "production" && !envFileExists) {
    throw new Error(`envs not found`);
  }

  return env;
};

module.exports = getEnv;
