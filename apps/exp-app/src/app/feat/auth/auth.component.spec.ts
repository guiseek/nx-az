import { Component } from '@angular/core'
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'

import { AuthComponent } from './auth.component'

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent'
}

describe('AuthComponent', () => {
  let host: SpectatorHost<AuthComponent, CustomHostComponent>
  const createHost = createHostFactory({
    component: AuthComponent,
    host: CustomHostComponent,
  })

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`)
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent')
  })
})
