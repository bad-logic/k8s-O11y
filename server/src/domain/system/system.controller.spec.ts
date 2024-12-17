import { Test } from '@nestjs/testing';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { AppLoggerService } from '../../core/logger/Applogger.service';

describe('HealthController', () => {
  let systemController: SystemController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [SystemController],
      providers: [
        SystemService,
        {
          provide: AppLoggerService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            info: jest.fn(),
          },
        },
      ],
    }).compile();
    systemController = module.get<SystemController>(SystemController);
  });

  it('should be defined', () => {
    expect(systemController).toBeDefined();
  });

  describe('health check', () => {
    it('should return ok status ', async () => {
      const result = await systemController.check();
      expect(result.server.status).toEqual('OK');
    });
  });
});
