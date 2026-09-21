from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from services.matching import MatchingEngine
from services.rag import RAGService

app = FastAPI(title="AgentKart AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

matching_engine = MatchingEngine()
rag_service = RAGService()

class Requirement(BaseModel):
    raw_text: str
    tenant_id: str

class ChatRequest(BaseModel):
    message: str
    agent_id: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-api"}

@app.get("/")
def root():
    return {
        "message": "AgentKart AI API is running on Vercel!",
        "docs": "/docs",
        "health": "/health"
    }

@app.post("/api/v1/agent/chat")
async def agent_chat(req: ChatRequest):
    # Depending on agent_id, we can branch logic.
    # For Customer Support Agent (id: 1), use RAG:
    if req.agent_id == "1":
        answer = await rag_service.get_answer(req.message)
        return {"response": answer}
    
    # Generic fallback for other agents
    return {"response": f"I am Agent {req.agent_id}. I have queued this task for execution."}

@app.post("/api/v1/requirements")
async def create_requirement(req: Requirement, x_tenant_id: str = Header(default=None)):
    tenant = req.tenant_id or x_tenant_id or "default_tenant"
    matches = await matching_engine.find_matches(req.raw_text, tenant)
    
    return {
        "status": "processed", 
        "text": req.raw_text,
        "matches": [m.dict() for m in matches]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

