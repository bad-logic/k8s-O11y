import { Test } from '@nestjs/testing';
import { SystemController } from './system.controller';
import { TerminusModule } from '@nestjs/terminus';
import { SystemService } from './system.service';

describe('HealthController', () => {
  let systemController: SystemController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [SystemController],
      providers: [SystemService],
    }).compile();
    systemController = module.get<SystemController>(SystemController);
  });

  it('should be defined', () => {
    expect(systemController).toBeDefined();
  });

  describe('health check', () => {
    it('should return ok status ', async () => {
      const result = await systemController.check();
      expect(result.status).toEqual('ok');
    });
  });
});
