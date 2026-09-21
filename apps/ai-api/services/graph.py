import os
from neo4j import GraphDatabase

class GraphService:
    def __init__(self):
        print("Initializing Neo4j Graph Service...")
        neo4j_uri = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
        neo4j_user = os.environ.get("NEO4J_USER", "neo4j")
        neo4j_password = os.environ.get("NEO4J_PASSWORD", "password")
        
        try:
            self.driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_user, neo4j_password))
            self._seed_graph()
        except Exception as e:
            print(f"Failed to connect to Neo4j: {e}")
            self.driver = None

    def _seed_graph(self):
        """Seed Neo4j with our hierarchical agent structure"""
        query = """
        MERGE (ceo:Agent {id: 'ceo-1', name: 'Aarav (CEO)', role: 'Management'})
        MERGE (support:Agent {id: '1', name: 'Aditi (Support)', role: 'L1 Support'})
        MERGE (sales:Agent {id: '2', name: 'Rahul (Sales)', role: 'Outbound SDR'})
        MERGE (marketing:Agent {id: '3', name: 'Neha (Marketing)', role: 'Content'})

        MERGE (ceo)-[:MANAGES]->(support)
        MERGE (ceo)-[:MANAGES]->(sales)
        MERGE (ceo)-[:MANAGES]->(marketing)

        MERGE (t1:TaskType {name: 'Customer Support'})
        MERGE (t2:TaskType {name: 'Sales'})
        MERGE (t3:TaskType {name: 'Marketing'})

        MERGE (support)-[:CAN_EXECUTE]->(t1)
        MERGE (sales)-[:CAN_EXECUTE]->(t2)
        MERGE (marketing)-[:CAN_EXECUTE]->(t3)
        """
        with self.driver.session() as session:
            session.run(query)
            print("Neo4j graph seeded with Agent routing paths.")

    def get_routing_path(self, task_type: str):
        """Find which agent the CEO should route this task to"""
        if self.driver is None:
            return None
            
        query = """
        MATCH (ceo:Agent {id: 'ceo-1'})-[:MANAGES]->(worker:Agent)-[:CAN_EXECUTE]->(t:TaskType {name: $task_type})
        RETURN worker.id as agent_id, worker.name as agent_name
        """
        try:
            with self.driver.session() as session:
                result = session.run(query, task_type=task_type)
                record = result.single()
                if record:
                    return {"agent_id": record["agent_id"], "agent_name": record["agent_name"]}
        except Exception:
            pass
        return None

    def close(self):
        if self.driver:
            self.driver.close()
