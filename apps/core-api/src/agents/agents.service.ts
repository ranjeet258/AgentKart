import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(private prisma: PrismaService) {}

  async createAgent(dto: CreateAgentDto) {
    return this.prisma.agent.create({
      data: {
        name: dto.name,
        description: dto.description,
        category: dto.category,
        providerOrgId: dto.providerOrgId,
        status: 'DRAFT',
        versions: {
          create: {
            version: dto.version,
            runtimeSpec: dto.runtimeSpec,
            skillSpec: dto.skillSpec,
            pricingRef: dto.pricingRef,
            securityState: 'PENDING'
          }
        }
      },
      include: {
        versions: true
      }
    });
  }

  async getAgent(id: string) {
    return this.prisma.agent.findUnique({
      where: { id },
      include: { versions: true }
    });
  }

  async publishAgent(id: string, versionId: string) {
    return this.prisma.agent.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        currentVersionId: versionId
      }
    });
  }
}
