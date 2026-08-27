import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Controller('api/v1/agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  async createAgent(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.createAgent(createAgentDto);
  }

  @Get(':id')
  async getAgent(@Param('id') id: string) {
    return this.agentsService.getAgent(id);
  }

  @Patch(':id/publish')
  async publishAgent(
    @Param('id') id: string,
    @Body('versionId') versionId: string
  ) {
    return this.agentsService.publishAgent(id, versionId);
  }
}
