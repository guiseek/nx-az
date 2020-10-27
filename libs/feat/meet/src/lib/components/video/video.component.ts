import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core'
import { EventService } from '../../services/event.service'
import { EventHandler } from '../../services/interfaces'
import { ThemePalette } from '@angular/material/core'

@Component({
  selector: 'nx-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player', { static: true }) private player!: ElementRef
  @ViewChild('video', { static: true }) public video!: ElementRef

  @Input() src: string | null = null
  @Input() title: string | null = null
  @Input() autoplay = true
  @Input() preload = false
  @Input() loop = false
  @Input() quality = true
  @Input() fullscreen = true
  @Input() showFrameByFrame = false
  @Input() fps = 29.97
  @Input() download = false
  @Input() color: ThemePalette = 'primary'
  @Input() spinner = 'hourglass'
  @Input() poster: string | null = null
  @Input() keyboard = true
  @Input() overlay: boolean | null = null
  @Input() muted = true
  @Output() mutedChange = new EventEmitter<boolean>()

  @Input()
  get time() {
    return this.getVideoTag()?.currentTime as number | null
  }

  @Output() timeChange = new EventEmitter<number>()
  set time(val: number | null) {
    const video: HTMLVideoElement | null = this.getVideoTag()
    if (video && val) {
      if (val > video.duration) {
        val = video.duration
      }
      if (val < 0) {
        val = 0
      }
      if (val !== video.currentTime) {
        video.currentTime = val
      }
      if (this.lastTime !== video.currentTime) {
        setTimeout(() => this.timeChange.emit(video.currentTime), 0)
        this.lastTime = video.currentTime
      }
    }
  }

  playing = false

  isFullscreen = false

  videoWidth!: number
  videoHeight!: number
  lastTime!: number

  videoLoaded = false

  private isMouseMoving = false
  private isMouseMovingTimer!: number
  private isMouseMovingTimeout = 2000

  private events!: EventHandler[]

  constructor(private renderer: Renderer2, private evt: EventService) {}

  ngAfterViewInit(): void {
    this.events = [
      {
        element: this.video.nativeElement,
        name: 'loadstart',
        callback: (event) => (this.videoLoaded = false),
        dispose: () => {},
      },
      {
        element: this.video.nativeElement,
        name: 'loadedmetadata',
        callback: (event) => this.evLoadedMetadata(event),
        dispose: () => {},
      },
      {
        element: this.video.nativeElement,
        name: 'error',
        callback: (event) => console.error('Unhandled Video Error', event),
        dispose: () => {},
      },
      {
        element: this.video.nativeElement,
        name: 'contextmenu',
        callback: (event) => event.preventDefault(),
        dispose: () => {},
      },
      {
        element: this.video.nativeElement,
        name: 'timeupdate',
        callback: (event) => this.evTimeUpdate(event),
        dispose: () => {},
      },
      {
        element: this.player.nativeElement,
        name: 'mousemove',
        callback: (event) => this.evMouseMove(event),
        dispose: () => {},
      },
    ]

    this.video.nativeElement.onloadeddata = () => (this.videoLoaded = true)

    this.evt.addEvents(this.renderer, this.events)
  }

  ngOnDestroy(): void {
    this.video.nativeElement.onloadeddata = null

    this.evt.removeEvents(this.events)
  }

  load(): void {
    if (this.video && this.video.nativeElement) this.video.nativeElement.load()
  }

  getVideoTag(): HTMLVideoElement | null {
    return this.video && this.video.nativeElement
      ? (this.video.nativeElement as HTMLVideoElement)
      : null
  }

  evLoadedMetadata(event: any): void {
    this.videoWidth = this.video.nativeElement.videoWidth
    this.videoHeight = this.video.nativeElement.videoHeight
    this.videoLoaded = true
  }

  evMouseMove(event: any): void {
    this.isMouseMoving = true
    clearTimeout(this.isMouseMovingTimer)
    this.isMouseMovingTimer = window.setTimeout(() => {
      this.isMouseMoving = false
    }, this.isMouseMovingTimeout)
  }

  evTimeUpdate(event: any): void {
    this.time = this.getVideoTag()?.currentTime as number | null
  }

  getOverlayClass(activeClass: string, inactiveClass: string): any {
    if (this.overlay === null) {
      return !this.playing || this.isMouseMoving ? activeClass : inactiveClass
    } else {
      return this.overlay ? activeClass : inactiveClass
    }
  }
}
