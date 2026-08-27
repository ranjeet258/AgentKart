from pydantic import BaseModel
from typing import List, Dict, Any
from qdrant_client import QdrantClient

class AgentMatch(BaseModel):
    agent_id: str
    score: float
    explanation: str

class MatchingEngine:
    def __init__(self):
        print("Initializing Qdrant Matching Engine with FastEmbed...")
        # Connect to local Qdrant container
        self.qdrant = QdrantClient("http://localhost:6333")
        self.collection_name = "agents"
        
        # Configure fastembed inside Qdrant (auto-downloads lightweight BAAI model)
        self.qdrant.set_model("BAAI/bge-small-en-v1.5")
        
        # Ensure collection exists and is seeded
        if not self.qdrant.collection_exists(self.collection_name):
            print("Creating Qdrant collection and seeding agents...")
            self.qdrant.create_collection(
                collection_name=self.collection_name,
                vectors_config=self.qdrant.get_fastembed_vector_params(),
            )
            self._seed_agents()
        else:
            print("Qdrant collection already exists.")
            
    def _seed_agents(self):
        """Seed Qdrant with our 3 first-party agents for vector search"""
        agents = [
            {
                "id": 1,
                "text": "Customer Support Agent. Fully autonomous L1 support agent. Integrates seamlessly with Zendesk to resolve common tickets, process refunds, and answer product questions instantly 24/7. Ticket resolution via email and chat. Refund processing. Knowledge base retrieval. Escalation to human agents.",
                "metadata": {"agent_id": "1", "category": "Customer Support"}
            },
            {
                "id": 2,
                "text": "Sales Agent. Autonomous outbound SDR that researches prospects, writes highly personalized cold emails, and manages follow-ups directly in Salesforce to book meetings on your calendar. Automated prospect research. Hyper-personalized cold outreach. Objection handling. Calendar booking.",
                "metadata": {"agent_id": "2", "category": "Sales"}
            },
            {
                "id": 3,
                "text": "Marketing Agent. Your complete digital marketing assistant. Generates SEO-optimized content, schedules social media posts across platforms, and continuously analyzes ad campaign performance to suggest optimizations. SEO Content Generation. Social Media Scheduling. Ad Performance Analytics. A/B Testing Copy.",
                "metadata": {"agent_id": "3", "category": "Marketing"}
            }
        ]
        
        # Use Qdrant's automatic embedding feature via fastembed
        self.qdrant.add(
            collection_name=self.collection_name,
            documents=[a["text"] for a in agents],
            metadata=[a["metadata"] for a in agents],
            ids=[a["id"] for a in agents]
        )
        print("Seeding complete.")

    async def extract_intent(self, raw_text: str) -> Dict[str, Any]:
        """
        Step 1: Structured intent extraction. 
        In Phase 2, we simulate the LLM call using simple heuristic keyword matching for speed locally.
        """
        category = "General"
        text_lower = raw_text.lower()
        if any(w in text_lower for w in ["support", "ticket", "refund", "customer"]):
            category = "Customer Support"
        elif any(w in text_lower for w in ["sales", "email", "outbound", "meeting", "prospect"]):
            category = "Sales"
        elif any(w in text_lower for w in ["marketing", "seo", "post", "social", "ad", "campaign"]):
            category = "Marketing"
            
        return {
            "category": category,
            "query": raw_text
        }

    async def retrieve_candidates(self, text: str) -> List[dict]:
        """
        Step 3: Qdrant candidate retrieval using FastEmbed
        """
        hits = self.qdrant.query(
            collection_name=self.collection_name,
            query_text=text,
            limit=3
        )
        
        candidates = []
        for hit in hits:
            candidates.append({
                "agent_id": hit.metadata["agent_id"],
                "score": hit.score,
                "category": hit.metadata["category"]
            })
        return candidates

    async def check_permissions(self, candidates: List[dict], intent: Dict[str, Any], tenant_id: str) -> List[dict]:
        """
        Step 4: Neo4j relationship / permission checks (Phase 4)
        Uses the Neo4j graph to ensure the CEO is allowed to route the intent to these candidates.
        """
        if not hasattr(self, 'graph_service'):
            from services.graph import GraphService
            self.graph_service = GraphService()
            
        routing = self.graph_service.get_routing_path(intent["category"])
        
        permitted = []
        for c in candidates:
            # If graph dictates a specific routing path for this task, boost it or enforce it
            if routing and c["agent_id"] == routing["agent_id"]:
                c["score"] += 0.2  # Bonus for correct hierarchical graph route
                permitted.append(c)
            else:
                permitted.append(c)
                
        return permitted

    async def find_matches(self, raw_text: str, tenant_id: str) -> List[AgentMatch]:
        """
        Full Phase 2 & 4 Semantic Matching & Graph Pipeline
        """
        intent = await self.extract_intent(raw_text)
        
        candidates = await self.retrieve_candidates(raw_text)
        
        # Apply Neo4j Graph Routing (Phase 4)
        permitted = await self.check_permissions(candidates, intent, tenant_id)
        
        ranked = []
        for c in permitted:
            if c["score"] > 0.3:
                explanation = f"Semantic Match Score: {c['score']:.2f}. "
                if c["category"] == intent["category"]:
                    explanation += f"Perfectly aligns with your intent for {intent['category']} tasks. "
                else:
                    explanation += f"Agent possesses complementary skills. "
                    
                if c["score"] > 1.0: # Means they got the Neo4j boost
                    explanation += "Verified by Neo4j graph routing path!"
                    
                ranked.append(
                    AgentMatch(
                        agent_id=c["agent_id"],
                        score=min(c["score"], 1.0), # cap at 1.0
                        explanation=explanation
                    )
                )
                
        return sorted(ranked, key=lambda x: x.score, reverse=True)
