import compact from 'lodash.compact'
import flattenDeep from 'lodash.flattendeep'
import { CommandModule, Argv } from 'yargs'
import { Injectable } from '@nestjs/common'
import { MetadataScanner } from '@nestjs/core/metadata-scanner'
import { ModulesContainer } from '@nestjs/core/injector/modules-container'
import { Injectable as IInjectable } from '@nestjs/common/interfaces'
import {
  SeekCliMetadata,
  SeekCliParamTypes,
  SeekCliParamMetadata,
  SeekCliOptionsOption,
  SeekCliPositionalOption,
  SeekCliParamMetadataItem,
  CLI_HANDLER_METADATA,
} from './seek-cli.decorator'
import { SeekCliService } from './seek-cli.service'

@Injectable()
export class SeekCliExplorerService {
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly metadataScanner: MetadataScanner,
    private readonly cliService: SeekCliService
  ) {}

  explore(): CommandModule[] {
    const components = [...this.modulesContainer.values()].map(
      (module) => module.components
    )

    return compact(
      flattenDeep<CommandModule>(
        components.map((component) =>
          [...component.values()].map(({ instance, metatype }) =>
            this.filterSeekCommands(instance, metatype)
          )
        )
      )
    )
  }

  protected filterSeekCommands(instance: IInjectable, metatype: any) {
    if (!instance) return

    const prototype = Object.getPrototypeOf(instance)
    const components = this.metadataScanner.scanFromPrototype(
      instance,
      prototype,
      (name) => this.extractMetadata(instance, prototype, name)
    )

    return components
      .filter((command) => !!command.metadata)
      .map<CommandModule>((command) => {
        const exec = instance[command.methodName].bind(instance)
        const builder = (yargs: Argv) => {
          return this.generateSeekCliBuilder(command.metadata.params, yargs)
        } // EOF builder

        const handler = async (argv: any) => {
          const params = this.generateSeekCliHandlerParams(
            command.metadata.params,
            argv
          )

          this.cliService.run()
          const code = await exec(...params)
          // tslint:disable-next-line: no-unused-expression
          command.metadata.option.autoExit && this.cliService.exit(code || 0)
        }

        return {
          ...command.metadata.option,
          builder,
          handler,
        }
      })
  }

  protected extractMetadata(instance, prototype, methodName: string) {
    const callback = prototype[methodName]
    const metadata: SeekCliMetadata = Reflect.getMetadata(
      CLI_HANDLER_METADATA,
      callback
    )

    return {
      methodName,
      metadata,
    }
  }

  protected iteratorParamMetadata<O>(
    params: SeekCliParamMetadata<O>,
    callback: (item: SeekCliParamMetadataItem<O>, key: string) => void
  ) {
    if (!params) {
      return
    }

    Object.keys(params).forEach((key) => {
      const param: SeekCliParamMetadataItem<O>[] = params[key]
      if (!param || !Array.isArray(param)) {
        return
      }

      param.forEach((metadata) => callback(metadata, key))
    })
  }

  private generateSeekCliHandlerParams(
    params: SeekCliParamMetadata<
      SeekCliOptionsOption | SeekCliPositionalOption
    >,
    argv: any
  ) {
    const list = []

    this.iteratorParamMetadata(params, (item, key) => {
      switch (key) {
        case SeekCliParamTypes.OPTION:
          list[item.index] = argv[(item.option as SeekCliOptionsOption).name]
          break

        case SeekCliParamTypes.POSITIONAL:
          list[item.index] = argv[(item.option as SeekCliPositionalOption).name]
          break

        case SeekCliParamTypes.ARGV:
          list[item.index] = argv

        // tslint:disable-next-line: no-switch-case-fall-through
        default:
          break
      }
    })

    return list
  }

  private generateSeekCliBuilder(
    params: SeekCliParamMetadata<
      SeekCliOptionsOption | SeekCliPositionalOption
    >,
    yargs: Argv
  ) {
    this.iteratorParamMetadata(params, (item, key) => {
      switch (key) {
        case SeekCliParamTypes.OPTION:
          yargs.option(
            (item.option as SeekCliOptionsOption).name,
            item.option as SeekCliOptionsOption
          )
          break

        case SeekCliParamTypes.POSITIONAL:
          yargs.positional(
            (item.option as SeekCliPositionalOption).name,
            item.option as SeekCliPositionalOption
          )
          break

        default:
          break
      }
    })

    return yargs
  }
}
