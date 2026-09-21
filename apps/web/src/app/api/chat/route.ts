import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Call the FastAPI Python backend
    const aiApiUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:8000';
    const response = await fetch(`${aiApiUrl}/api/v1/agent/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        agent_id: body.agentId || '1'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with AI Engine');
    }

    const data = await response.json();
    return NextResponse.json({ response: data.response });
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ response: "Error: Could not connect to local AI Engine. Make sure the FastAPI python server is running!" }, { status: 500 });
  }
}
