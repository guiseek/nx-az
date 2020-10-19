import { Test, TestingModule } from '@nestjs/testing';
import { SeekCliExplorerService } from './seek-cli-explorer.service';

describe('SeekCliExplorerService', () => {
  let service: SeekCliExplorerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeekCliExplorerService],
    }).compile();

    service = module.get<SeekCliExplorerService>(SeekCliExplorerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
