import 'reflect-metadata'
import { SetMetadata } from '@nestjs/common'
import { PositionalOptions, Options } from 'yargs'

export const CLI_HANDLER_METADATA = '__cli-handler-metadata__'
export const CLI_ARGS_METADATA = '__cli-args-metadata__'
export enum SeekCliParamTypes {
  POSITIONAL = 'POSITIONAL',
  OPTION = 'OPTION',
  ARGV = 'ARGV',
}

export type SeekCliParamMetadata<O> = {
  [type in SeekCliParamTypes]: SeekCliParamMetadataItem<O>[]
}

export interface SeekCliParamMetadataItem<O> {
  index: number
  option: O
}

const createSeekCliParamDecorator = <O>(paramtype: SeekCliParamTypes) => {
  return (option?: O): ParameterDecorator => (target, key, index) => {
    const params = Reflect.getMetadata(CLI_ARGS_METADATA, target[key]) || {}
    Reflect.defineMetadata(
      CLI_ARGS_METADATA,
      {
        ...params,
        [paramtype]: [...(params[paramtype] || []), { index, option }],
      },
      target[key]
    )
  }
}

export interface SeekCliMetadata {
  params: SeekCliParamMetadata<SeekCliPositionalOption | SeekCliOptionsOption>
  option: SeekCliOption
}

export interface SeekCliOption {
  aliases?: string[] | string
  command: string[] | string
  describe?: string | false
  autoExit?: boolean
}

// export const SeekCli = (...args: string[]) => SetMetadata('seek-cli', args)
export function SeekCli(option: SeekCliOption): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    if (option && typeof option.autoExit !== 'boolean') {
      option.autoExit = true
    }

    const metadata: SeekCliMetadata = {
      params: Reflect.getMetadata(CLI_ARGS_METADATA, descriptor.value),
      option,
    }

    SetMetadata(CLI_HANDLER_METADATA, metadata)(target, key, descriptor)
  }
}

export interface SeekCliPositionalOption extends PositionalOptions {
  name: string
}

export const Positional = createSeekCliParamDecorator<SeekCliPositionalOption>(
  SeekCliParamTypes.POSITIONAL
)

export interface SeekCliOptionsOption extends Options {
  name: string
}

export const Option = createSeekCliParamDecorator<SeekCliOptionsOption>(
  SeekCliParamTypes.OPTION
)

export const Argv = createSeekCliParamDecorator(SeekCliParamTypes.ARGV)
