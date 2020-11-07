import {
  Directive,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Output,
  SkipSelf,
} from '@angular/core'
import { animationFrameScheduler, interval, Observable } from 'rxjs'
import { map, mapTo, tap } from 'rxjs/operators'
import { connect } from '../feat-meet.utilities'
import {
  AUDIO_CONTEXT,
  AUDIO_NODE,
  CONSTRUCTOR_SUPPORT,
} from '../feat-meet.injectors'

@Directive({
  selector: '[nxAudioAnalyser]',
  exportAs: 'AudioNode',
  providers: [
    {
      provide: AUDIO_NODE,
      useExisting: forwardRef(() => AudioAnalyserDirective),
    },
  ],
})
export class AudioAnalyserDirective extends AnalyserNode implements OnDestroy {
  @Input() fftSize!: number

  @Input() minDecibels!: number
  @Input() maxDecibels!: number
  @Input() smoothingTimeConstant!: number
  @Input() channelCount!: number
  @Input() channelCountMode!: ChannelCountMode
  @Input() channelInterpretation!: ChannelInterpretation

  constructor(
    @Inject(AUDIO_CONTEXT) context: BaseAudioContext,
    @SkipSelf() @Inject(AUDIO_NODE) node: AudioNode | null,
    @Inject(CONSTRUCTOR_SUPPORT) modern: boolean
  ) {
    if (modern) {
      super(context)
      AudioAnalyserDirective.init(this, node)
    } else {
      const result = context.createAnalyser() as AudioAnalyserDirective

      Object.setPrototypeOf(result, AudioAnalyserDirective.prototype)
      AudioAnalyserDirective.init(result, node)

      return result
    }
  }

  @Output()
  frequencyByte$?: Observable<Uint8Array>

  @Output()
  frequencyFloat$?: Observable<Float32Array>

  @Output()
  timeByte$?: Observable<Uint8Array>

  @Output()
  timeFloat$?: Observable<Float32Array>

  static init(that: AudioAnalyserDirective, node: AudioNode | null) {
    connect(node, that)

    that.frequencyByte$ = interval(0, animationFrameScheduler).pipe(
      mapTo(new Uint8Array(that.frequencyBinCount)),
      map((array) =>
        array.length === that.frequencyBinCount
          ? array
          : new Uint8Array(that.frequencyBinCount)
      ),
      tap((array) => that.getByteFrequencyData(array))
    )

    that.frequencyFloat$ = interval(0, animationFrameScheduler).pipe(
      mapTo(new Float32Array(that.frequencyBinCount)),
      map((array) =>
        array.length === that.frequencyBinCount
          ? array
          : new Float32Array(that.frequencyBinCount)
      ),
      tap((array) => that.getFloatFrequencyData(array))
    )

    that.timeByte$ = interval(0, animationFrameScheduler).pipe(
      mapTo(new Uint8Array(that.fftSize)),
      map((array) =>
        array.length === that.fftSize
          ? array
          : new Uint8Array(that.frequencyBinCount)
      ),
      tap((array) => that.getByteTimeDomainData(array))
    )

    that.timeFloat$ = interval(0, animationFrameScheduler).pipe(
      mapTo(new Float32Array(that.fftSize)),
      map((array) =>
        array.length === that.fftSize
          ? array
          : new Float32Array(that.frequencyBinCount)
      ),
      tap((array) => that.getFloatTimeDomainData(array))
    )
  }

  ngOnDestroy() {
    this.disconnect()
  }
}
