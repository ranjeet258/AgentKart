import asyncio
import logging
from temporalio.client import Client

from temporal.workflows import CEOOrchestrationWorkflow

async def main():
    logging.basicConfig(level=logging.INFO)
    
    # Connect to local Temporal server
    client = await Client.connect("localhost:7233")
    
    goal = "Launch Q3 B2B Marketing Campaign for New Features"
    print(f"Triggering CEO Workflow with Goal: {goal}")
    
    # Execute the workflow
    result = await client.execute_workflow(
        CEOOrchestrationWorkflow.run,
        goal,
        id="ceo-workflow-q3-launch",
        task_queue="agent-orchestration-queue",
    )
    
    print(f"Workflow completed successfully!")
    print(f"Final Result: {result}")

if __name__ == "__main__":
    asyncio.run(main())
