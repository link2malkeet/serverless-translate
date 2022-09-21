import type { AWS } from "@serverless/typescript";

import { translate } from "@functions/translate";

const serverlessConfiguration: AWS = {
  service: "serverless-translate",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-iam-roles-per-function"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "link2malkeet",
    region: "ap-southeast-2",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { translate },
};

module.exports = serverlessConfiguration;
