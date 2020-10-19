import { Argv, CommandModule } from 'yargs'
import { Global, Injectable } from '@nestjs/common'

@Global()
@Injectable()
export class SeekCliService {
  private _yargs?: Argv
  private running = false

  initialize(metadatas: CommandModule[]) {
    const { yargs } = this

    yargs
      .scriptName('cli')
      .demandCommand(1)
      .help('h')
      .alias('h', 'help')
      .alias('v', 'version')
      .strict()

    metadatas.forEach((command) => {
      yargs.command(command)
    })
  }

  exec() {
    const { yargs } = this
    // tslint:disable-next-line: no-unused-expression
    yargs.argv
  }

  run() {
    this.running = true
  }

  exit(code?: number) {
    this.running = false
    process.exit(code)
  }

  get yargs() {
    if (this._yargs === undefined) {
      this._yargs = require('yargs')
    }
    return this._yargs
  }

  get isRunning() {
    return this.running
  }
}
