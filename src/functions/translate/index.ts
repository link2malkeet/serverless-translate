import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export const translate = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "translate",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["translate:TranslateText"],
      Resource: "*",
    },
  ],
};
