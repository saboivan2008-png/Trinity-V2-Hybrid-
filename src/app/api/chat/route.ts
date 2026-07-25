 import { aiClient } from "@/lib/ai/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const response = await aiClient.responses.create({
      model: "gpt-5.5",
      input: prompt,
    });

    return Response.json({ text: response.output_text });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}