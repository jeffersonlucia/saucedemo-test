import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  @Get()
  @ApiOkResponse({
    description: 'API healthcheck.',
    schema: {
      example: {
        status: 'ok',
        service: 'whiskey-club-os-api',
      },
    },
  })
  getHealth() {
    return {
      status: 'ok',
      service: 'whiskey-club-os-api',
      timestamp: new Date().toISOString(),
    };
  }
}
