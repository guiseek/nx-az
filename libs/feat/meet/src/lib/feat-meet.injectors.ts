import { inject, InjectionToken } from '@angular/core'

export const MEDIA_STREAM = new InjectionToken<MediaStream>(
  // 'MediaStream for MediaStreamAudioSourceNode'
  'feat-meet.media-stream'
)
export const MEDIA_STREAM_TRACK = new InjectionToken<MediaStreamTrack>(
  // 'MediaStreamTrack for MediaStreamTrackAudioSourceNode'
  'feat-meet.media-stream-track'
)

export const AUDIO_NODE = new InjectionToken<AudioNode | null>(
  // 'Web Audio API audio node',
  'feat-meet.audio-node',
  {
    factory: () => null,
  }
)

export const AUDIO_SUPPORT = new InjectionToken<boolean>(
  // 'Web Audio API support',
  'feat-meet.audio-support',
  {
    providedIn: 'root',
    factory: () => !!AudioContext,
  }
)

export const AUDIO_CONTEXT = new InjectionToken<BaseAudioContext>(
  // 'Web Audio API context',
  'feat-meet.audio-context',
  {
    providedIn: 'root',
    factory: () => new AudioContext(),
  }
)

/**
 * This is mostly for internal use only
 */
export const CONSTRUCTOR_SUPPORT = new InjectionToken<boolean>(
  'Tests if constructor mode of node creation is supported or a fallback to factory method is needed',
  {
    providedIn: 'root',
    factory: () => {
      try {
        return !!new GainNode(inject(AUDIO_CONTEXT))
      } catch (_) {
        return false
      }
    },
  }
)
