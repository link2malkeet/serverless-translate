# Serverless AWS Translation using Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/translate` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/translate/schema.ts` JSON-Schema definition: it must contain the `name` property.

- sending a `POST` request to `/translate` with a payload **not** containing a string property named `text` and `language` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/translate` with a payload containing a string property named `text` and language code like fr, de, will result in API Gateway returning a `200` HTTP status code with a desired response containing the translated text.

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to test the translate function locally, run the following command:

- `npx sls invoke local -f translate --path src/functions/translate/mock.json` if you're using NPM
- `yarn sls invoke local -f translate --path src/functions/translate/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/translate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "I love you",
    "language": "de"
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── translate
│   │   │   ├── handler.ts      # `translate` lambda source code
│   │   │   ├── index.ts        # `translate` lambda Serverless configuration
│   │   │   ├── mock.json       # `translate` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `translate` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [@aws-sdk/client-translate](https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-translate) - provides AWS SDK for JavaScript Translate Client for Node.js, Browser and React Native.


