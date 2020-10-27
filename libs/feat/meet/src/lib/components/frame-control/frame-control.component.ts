import { Component, Input } from '@angular/core'

@Component({
  selector: 'nx-frame-control',
  template: `
    <button mat-icon-button (click)="seekFrames(-5)">
      <mat-icon>skip_previous</mat-icon>
    </button>

    <button mat-icon-button (click)="seekFrames(-1)">
      <mat-icon>arrow_left</mat-icon>
    </button>

    <button mat-icon-button (click)="seekFrames(1)">
      <mat-icon>arrow_right</mat-icon>
    </button>

    <button mat-icon-button (click)="seekFrames(5)">
      <mat-icon>skip_next</mat-icon>
    </button>
  `,
})
export class FrameControlComponent {
  @Input() video!: HTMLVideoElement
  @Input() fps = 29.97

  seekFrames(nbFrames: number) {
    if (!this.video.paused) {
      this.video.pause()
    }

    const currentFrames = this.video.currentTime * this.fps
    const newPos = (currentFrames + nbFrames) / this.fps + 0.00001
    this.video.currentTime = newPos
  }
}
