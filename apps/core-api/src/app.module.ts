import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [AuthModule, OrganizationsModule, AgentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
