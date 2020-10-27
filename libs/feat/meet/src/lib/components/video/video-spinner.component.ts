import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  Renderer2,
} from '@angular/core'
import { EventHandler, EventService } from '../../services'

@Component({
  selector: 'nx-video-spinner',
  template: `
    <div *ngIf="!videoLoaded || videoBuffering" [class]="spinner"></div>
  `,
  styleUrls: [
    './styles/video-spinner.css',
    './styles/split-ring.css',
    './styles/hourglass.css',
    './styles/spin.css',
    './styles/dot.css',
  ],
})
export class VideoSpinnerComponent implements AfterViewInit, OnDestroy {
  @Input() video!: HTMLVideoElement
  @Input() spinner = 'spin'

  videoBuffering = false
  videoLoaded = false

  private events: EventHandler[] = []

  constructor(private renderer: Renderer2, private evt: EventService) {}

  ngAfterViewInit(): void {
    this.events = [
      {
        element: this.video,
        name: 'loadstart',
        callback: (event) => (this.videoLoaded = false),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'loadedmetadata',
        callback: (event) => (this.videoLoaded = true),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'canplay',
        callback: (event) => (this.videoBuffering = false),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'waiting',
        callback: (event) => (this.videoBuffering = true),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'durationchange',
        callback: (event) => (this.videoBuffering = true),
        dispose: () => {},
      },
    ]

    this.video.onloadeddata = () => (this.videoLoaded = true)

    this.evt.addEvents(this.renderer, this.events)
  }

  ngOnDestroy(): void {
    this.video.onloadeddata = null

    this.evt.removeEvents(this.events)
  }
}
