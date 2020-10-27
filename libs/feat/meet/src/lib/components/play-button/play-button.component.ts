import { EventHandler } from '../../services/interfaces'
import { EventService } from '../../services/event.service'
import {
  Component,
  OnInit,
  HostListener,
  Renderer2,
  Input,
  EventEmitter,
  Output,
  AfterViewInit,
  OnDestroy,
} from '@angular/core'

@Component({
  selector: 'nx-play-button',
  template: `
    <button mat-icon-button (click)="toggleVideoPlayback()">
      <mat-icon *ngIf="!play">play_arrow</mat-icon>
      <mat-icon *ngIf="play">pause</mat-icon>
    </button>
  `,
})
export class PlayButtonComponent implements AfterViewInit, OnDestroy {
  @Input() video!: HTMLVideoElement

  @Input() play = false

  @Output() playChanged = new EventEmitter<boolean>()

  @Input() keyboard = true

  private events!: EventHandler[]

  constructor(private renderer: Renderer2, private evt: EventService) {}

  ngAfterViewInit(): void {
    this.events = [
      {
        element: this.video,
        name: 'play',
        callback: (event) => this.setVideoPlayback(true),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'pause',
        callback: (event) => this.setVideoPlayback(false),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'durationchange',
        callback: (event) => this.setVideoPlayback(false),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'ended',
        callback: (event) => this.setVideoPlayback(false),
        dispose: () => {},
      },
      {
        element: this.video,
        name: 'click',
        callback: (event) => this.toggleVideoPlayback(),
        dispose: () => {},
      },
    ]

    this.evt.addEvents(this.renderer, this.events)
  }

  ngOnDestroy(): void {
    this.evt.removeEvents(this.events)
  }

  setVideoPlayback(value: boolean) {
    if (this.play !== value) this.toggleVideoPlayback()
  }

  toggleVideoPlayback(): void {
    this.play = !this.play
    this.updateVideoPlayback()
  }

  updateVideoPlayback(): void {
    this.play ? this.video.play() : this.video.pause()
    this.playChanged.emit(this.play)
  }

  @HostListener('document:keyup.space', ['$event'])
  onPlayKey(event: KeyboardEvent) {
    if (this.keyboard) {
      this.toggleVideoPlayback()
      event.preventDefault()
    }
  }
}
