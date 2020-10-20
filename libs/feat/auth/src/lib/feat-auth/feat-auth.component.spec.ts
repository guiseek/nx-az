import { Component } from '@angular/core'
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'

import { FeatAuthComponent } from './feat-auth.component'

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent'
}

describe('FeatAuthComponent', () => {
  let host: SpectatorHost<FeatAuthComponent, CustomHostComponent>
  const createHost = createHostFactory({
    component: FeatAuthComponent,
    host: CustomHostComponent,
  })

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`)
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent')
  })
})
