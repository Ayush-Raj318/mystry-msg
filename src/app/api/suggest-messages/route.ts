import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Debug: Check if API key exists
    const GEMINI_API_KEY = process.env.NEXT_APP_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not defined');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Debug: Log API key format (safely)
    console.log('API Key format check:', {
      hasKey: !!GEMINI_API_KEY,
      startsWithAIza: GEMINI_API_KEY.startsWith('AIza'),
      length: GEMINI_API_KEY.length,
      // Don't log the actual key for security
    });

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Streaming
    const streamResult = await model.generateContentStream(prompt);
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (err) {
          console.error('Streaming chunk error:', err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error: any) {
    console.error('Streaming error:', error);
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
