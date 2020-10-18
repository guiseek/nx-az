import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FireAuthOptions,
  FIRE_AUTH_OPTIONS,
  FIRE_AUTH_VALUES,
} from './fire-auth.injectors'
import { FireAuthMessages } from './fire-auth.types'
import { FireAuthMessage } from './fire-auth.message'

@NgModule({
  imports: [CommonModule],
  providers: [],
})
export class FireAuthModule {
  static forRoot(
    options: FireAuthOptions,
    messages?: FireAuthMessages
  ): ModuleWithProviders<FireAuthModule> {
    if (!!messages?.length) {
      FireAuthMessage.setCustomMessages(messages)
    }
    return {
      ngModule: FireAuthModule,
      providers: [
        {
          provide: FIRE_AUTH_OPTIONS,
          useValue: { ...FIRE_AUTH_VALUES, ...options },
        },
      ],
    }
  }
}
