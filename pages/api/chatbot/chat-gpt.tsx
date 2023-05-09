import { Author, IMessage } from "components/chatbot/chatbot";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

// registration
async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  const { body } = request;

  console.log("Executing /api/chatbot/chat-gpt handler.");

  if (request.method !== "POST") {
    response.status(400).send("Use POST method");
    return;
  }

  if (!body.prompt || body.prompt === "") {
    response.status(400).send("Cannot get body of request");
    return;
  }

  if (!body.message || body.message === "") {
    response.status(400).send("Cannot get body of request");
    return;
  }

  console.log(body.prompt);

  console.log([
    ...body.message.map((msg: IMessage) => ({
      role: msg.author == Author.User ? "user" : "assistent",
      content: msg.text,
    })),
    { role: "user", content: body.prompt },
  ]);

  try {
    const responseAPI = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Jsi asistent pro pomoc seniorům s digitálními technologiemi`,
        },
        ...body.message.map((msg: IMessage) => ({
          role: msg.author == Author.User ? "user" : "assistant",
          content: msg.text,
        })),
        { role: "user", content: body.prompt },
      ],
      max_tokens: 1024,
    });

    const gptResponse =
      (await responseAPI.data.choices[0].message?.content.trim()) ||
      "Omlouváme se, došlo k chybě.";

    console.log(gptResponse);

    // error handling
    if (!gptResponse) {
      response.status(500).send("Unexpected error from server API call");
      return;
    }

    response.status(200).send({ text: gptResponse });
    return;
  } catch (error) {
    console.log(error);
    response.status(500).send("Unexpected error");
    return;
  }
}

export default handler;
