import os
import asyncio
from typing import List
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct

class RAGService:
    def __init__(self):
        print("Initializing RAG Service...")
        qdrant_url = os.environ.get("QDRANT_URL", "http://localhost:6335")
        qdrant_api_key = os.environ.get("QDRANT_API_KEY", None)
        
        try:
            if "localhost" in qdrant_url and os.environ.get("VERCEL"):
                self.client = QdrantClient(":memory:")
            else:
                self.client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
                
            self.collection_name = "knowledge_base"
            # FastEmbed model for generating local embeddings
            self.client.set_model("BAAI/bge-small-en-v1.5")
            self._seed_kb()
        except Exception as e:
            print(f"Failed to initialize Qdrant in RAGService: {e}")
            self.client = None

    def _seed_kb(self):
        if not self.client.collection_exists(self.collection_name):
            print(f"Creating collection {self.collection_name} for RAG...")
            # We don't need to manually create vectors if using fastembed .add()
            # but let's just use the add method directly which handles it.
            docs = [
                "Refund Policy: Refunds take 3-5 business days to process and will be returned to the original payment method.",
                "Shipping: Standard shipping takes 5-7 days. Expedited takes 2 days. We use FedEx and UPS.",
                "Password Reset: To reset your password, go to settings and click 'Forgot Password'. A link will be emailed to you.",
                "Cancellations: You can cancel an order within 24 hours of placing it from the order dashboard.",
                "Pricing: The basic plan is $10/mo, pro is $29/mo, and enterprise is custom.",
                "Contact: If you need human assistance, you can email support@agentkart.com."
            ]
            
            # Fastembed handles embedding text directly
            self.client.add(
                collection_name=self.collection_name,
                documents=docs,
                metadata=[{"source": "FAQ", "doc_id": i} for i in range(len(docs))],
                ids=[i for i in range(len(docs))]
            )
            print("Knowledge Base seeded successfully!")

    async def get_answer(self, query: str) -> str:
        """
        Takes user query, embeds it, finds closest document in Qdrant, and returns answer.
        """
        if self.client is None:
            return "I couldn't connect to my knowledge base. Please check Qdrant configuration."
            
        # Use Qdrant's built-in fastembed query
        results = self.client.query(
            collection_name=self.collection_name,
            query_text=query,
            limit=1
        )
        
        if not results:
            return "I couldn't find an answer to that in my knowledge base. Would you like me to escalate to a human?"
            
        best_match = results[0]
        if best_match.score < 0.3:
            return "I'm not completely sure. Based on my docs, I found this: " + best_match.document + "\nDoes that help?"
            
        return f"Based on our internal policies: {best_match.document}"
