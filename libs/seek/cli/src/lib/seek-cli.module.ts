import { Module, Global } from '@nestjs/common'
import { SeekCliService } from './seek-cli.service'

@Global()
@Module({
  controllers: [],
  providers: [SeekCliService],
  exports: [SeekCliService],
})
export class SeekCliModule {}
