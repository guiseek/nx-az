import { AuthUseCase, IAuthUseCase } from '@nx-core/domain'

interface Provider {
  provide: any
  useClass: any
}

export function swapProvider(
  provide: typeof AuthUseCase,
  useClass: any
): Provider {
  return { provide, useClass }
}
