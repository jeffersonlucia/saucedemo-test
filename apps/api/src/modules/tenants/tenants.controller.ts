import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';

@ApiTags('tenants')
@Controller({ path: 'tenants', version: '1' })
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get('current')
  @ApiOkResponse({ description: 'Tenant ativo do contexto atual.' })
  getCurrentTenant() {
    return this.tenantsService.getCurrentTenant();
  }

  @Get('current/config')
  @ApiOkResponse({ description: 'Branding e feature flags do tenant atual.' })
  getCurrentConfig() {
    return this.tenantsService.getCurrentConfig();
  }
}
