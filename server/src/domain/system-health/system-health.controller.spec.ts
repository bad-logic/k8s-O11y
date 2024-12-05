import { Test } from '@nestjs/testing';
import { SystemHealthController } from './system-health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { SystemHealthService } from './system-health.service';

describe('HealthController', () => {
  let systemHealthController: SystemHealthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [SystemHealthController],
      providers: [SystemHealthService],
    }).compile();
    systemHealthController = module.get<SystemHealthController>(
      SystemHealthController,
    );
  });

  it('should be defined', () => {
    expect(systemHealthController).toBeDefined();
  });

  describe('health check', () => {
    it('should return ok status ', async () => {
      const result = await systemHealthController.check();
      expect(result.status).toEqual('ok');
    });
  });
});
