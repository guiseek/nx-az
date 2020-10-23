import { Component } from '@angular/core'
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest'

import { FeatAuthFormComponent } from './feat-auth-form.component'

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent'
}

describe('FeatAuthFormComponent', () => {
  let host: SpectatorHost<FeatAuthFormComponent, CustomHostComponent>
  const createHost = createHostFactory({
    component: FeatAuthFormComponent,
    host: CustomHostComponent,
  })

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`)
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent')
  })
})
