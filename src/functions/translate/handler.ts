import {
  TranslateClient,
  TranslateTextCommand,
} from "@aws-sdk/client-translate";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import schema from "./schema";
import { apiResponses } from "../../libs/apiGateway";

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { text, language } = event.body;
  console.log(text, ":", language);
  const client = new TranslateClient({ region: "ap-southeast-2" });
  const command = new TranslateTextCommand({
    Text: text,
    SourceLanguageCode: "en",
    TargetLanguageCode: language,
  });
  try {
    const data = await client.send(command);
    console.log(data);
    return apiResponses._200({ message: data });
  } catch (error) {
    return apiResponses._400({
      message: `unable to translate the message: ${error.errorMessage}`,
    });
  }
};

export const main = middyfy(handler);
