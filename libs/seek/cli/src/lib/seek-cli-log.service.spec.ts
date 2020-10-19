import { MetadataScanner } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { SeekCliLogService } from './seek-cli-log.service';
import { SeekCliService } from './seek-cli.service';

import 'reflect-metadata'

describe('SeekCliLogService', () => {
  let service: SeekCliLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeekCliService, SeekCliLogService, MetadataScanner],
      exports: [SeekCliService],
    }).compile();

    service = module.get<SeekCliLogService>(SeekCliLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
