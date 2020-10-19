import { Test } from '@nestjs/testing'
import { SeekCliService } from './seek-cli.service'

describe('SeekCliService', () => {
  let service: SeekCliService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SeekCliService],
    }).compile()

    service = module.get(SeekCliService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
