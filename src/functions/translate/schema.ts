export default {
  type: "object",
  properties: {
    text: {
      type: "string",
    },
    language: {
      // enum: ["spanish", 'danish']
      type: "string",
    },
  },
  required: ["text", "language"],
} as const;
