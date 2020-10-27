import { Spectator, createComponentFactory } from '@ngneat/spectator'

import { ChatComponent } from './chat.component'

describe('ChatComponent', () => {
  let spectator: Spectator<ChatComponent>
  const createComponent = createComponentFactory(ChatComponent)

  it('should create', () => {
    spectator = createComponent()

    expect(spectator.component).toBeTruthy()
  })
})
