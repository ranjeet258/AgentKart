from temporalio import activity
import asyncio

@activity.defn
async def execute_agent_task(payload: dict) -> dict:
    """
    Simulates an agent executing a long-running task.
    In production, this would call LLM, interact with external APIs (Salesforce, Zendesk), etc.
    """
    agent_name = payload.get("agent_name", "Unknown Agent")
    task_description = payload.get("task", "Do something")
    
    activity.logger.info(f"[{agent_name}] Starting task: {task_description}")
    
    # Simulate thinking/API wait times (durable execution allows this to take hours/days!)
    await asyncio.sleep(2)
    
    activity.logger.info(f"[{agent_name}] Completed task!")
    
    return {
        "status": "success",
        "agent": agent_name,
        "result": f"Successfully completed: {task_description}. Output generated."
    }
