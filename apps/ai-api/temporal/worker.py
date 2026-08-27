import asyncio
import logging
from temporalio.client import Client
from temporalio.worker import Worker

from temporal.activities import execute_agent_task
from temporal.workflows import CEOOrchestrationWorkflow

async def main():
    logging.basicConfig(level=logging.INFO)
    
    print("Connecting to Temporal server at localhost:7233...")
    # Connect to the local Temporal server
    client = await Client.connect("localhost:7233")
    
    # Run a worker for the task queue
    worker = Worker(
        client,
        task_queue="agent-orchestration-queue",
        workflows=[CEOOrchestrationWorkflow],
        activities=[execute_agent_task],
    )
    
    print("Worker started. Listening for CEO workflows on 'agent-orchestration-queue'...")
    await worker.run()

if __name__ == "__main__":
    asyncio.run(main())
