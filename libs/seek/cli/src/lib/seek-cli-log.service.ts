import { Injectable } from '@nestjs/common'
import { SeekCliService } from './seek-cli.service'

@Injectable()
export class SeekCliLogService {
  constructor(private readonly cliService: SeekCliService) {}

  log(message: string) {
    if (!this.isRunning) return
    console.log(message)
  }

  error(message: string, trace: string) {
    if (!this.isRunning) return
    console.error(message, trace)
  }

  warn(message: string) {
    if (!this.isRunning) return
    console.warn(message)
  }

  private get isRunning(): boolean {
    return this.cliService.isRunning
  }
}
