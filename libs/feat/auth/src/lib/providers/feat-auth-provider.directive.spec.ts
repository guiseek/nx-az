import {
  createDirectiveFactory,
  SpectatorDirective,
} from '@ngneat/spectator/jest'

import { FeatAuthProviderDirective } from './feat-auth-provider.directive'

describe('FeatAuthProviderDirective ', () => {
  let spectator: SpectatorDirective<FeatAuthProviderDirective>
  const createDirective = createDirectiveFactory(FeatAuthProviderDirective)

  it('should change the background color', () => {
    spectator = createDirective(
      `<div nx-feat-auth-provider>Testing FeatAuthProviderDirective</div>`
    )

    expect(spectator.element).toHaveClass('auth-provider')

    spyOn(spectator.directive.clicked, 'emit')

    spectator.dispatchFakeEvent(spectator.element, 'click')

    expect(spectator.directive.clicked.emit).toHaveBeenCalled()
  })
})
