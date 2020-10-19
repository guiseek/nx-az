import { Module, Global, OnModuleInit } from '@nestjs/common'
import { SeekCliExplorerService } from './seek-cli-explorer.service'
import { MetadataScanner } from '@nestjs/core/metadata-scanner'
import { SeekCliService } from './seek-cli.service'

@Global()
@Module({
  providers: [SeekCliService, SeekCliExplorerService, MetadataScanner],
  exports: [SeekCliService],
})
export class SeekCliModule implements OnModuleInit {
  constructor(
    private readonly cliService: SeekCliService,
    private readonly cliExplorerService: SeekCliExplorerService
  ) {}

  onModuleInit() {
    this.cliService.initialize(this.cliExplorerService.explore())
  }
}
