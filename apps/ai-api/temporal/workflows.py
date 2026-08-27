from datetime import timedelta
from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from temporal.activities import execute_agent_task

@workflow.defn
class CEOOrchestrationWorkflow:
    @workflow.run
    async def run(self, company_goal: str) -> dict:
        """
        The CEO Agent Workflow.
        It receives a high-level goal, and orchestrates subordinate agents.
        """
        workflow.logger.info(f"[CEO Agent] Received company goal: {company_goal}")
        
        # Step 1: Tell Marketing to generate leads
        marketing_result = await workflow.execute_activity(
            execute_agent_task,
            {"agent_name": "Marketing Agent", "task": f"Generate targeted ad copy for: {company_goal}"},
            start_to_close_timeout=timedelta(minutes=5),
        )
        
        # Step 2: Tell Sales to act on the marketing output
        sales_result = await workflow.execute_activity(
            execute_agent_task,
            {"agent_name": "Sales Agent", "task": f"Write cold outreach sequence using {marketing_result['result']}"},
            start_to_close_timeout=timedelta(minutes=5),
        )
        
        # Step 3: Tell Support to prepare knowledge base
        support_result = await workflow.execute_activity(
            execute_agent_task,
            {"agent_name": "Customer Support Agent", "task": f"Update knowledge base for upcoming influx of users based on {sales_result['result']}"},
            start_to_close_timeout=timedelta(minutes=5),
        )
        
        workflow.logger.info("[CEO Agent] All sub-tasks completed successfully!")
        
        return {
            "status": "completed",
            "goal": company_goal,
            "marketing_report": marketing_result,
            "sales_report": sales_result,
            "support_report": support_result
        }
