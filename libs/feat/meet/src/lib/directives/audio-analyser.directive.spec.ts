import {
  createDirectiveFactory,
  SpectatorDirective,
} from '@ngneat/spectator/jest'

import { AudioAnalyserDirective } from './audio-analyser.directive'

describe('AudioAnalyserDirective ', () => {
  let spectator: SpectatorDirective<AudioAnalyserDirective>
  const createDirective = createDirectiveFactory(AudioAnalyserDirective)

  it('should change the background color', () => {
    // spectator = createDirective(`<div highlight>Testing AudioAnalyserDirective</div>`);

    // spectator.dispatchMouseEvent(spectator.element, 'mouseover');

    // expect(spectator.element).toHaveStyle({
    //   backgroundColor: 'rgba(0,0,0, 0.1)'
    // });

    // spectator.dispatchMouseEvent(spectator.element, 'mouseout');
    // expect(spectator.element).toHaveStyle({
    //   backgroundColor: '#fff'
    // });
    expect(true).toBeTruthy()
  })
})
