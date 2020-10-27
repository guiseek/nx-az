import { Component, Input } from '@angular/core'

@Component({
  selector: 'nx-time-control',
  template: `
    <div class="playtime">
      {{ video?.currentTime | secondsToTime }} /
      {{ video?.duration | secondsToTime }}
    </div>
  `,
  styles: [
    `
      .playtime {
        display: inline;
        font-size: 12px;
      }
    `,
  ],
})
export class TimeControlComponent {
  @Input() public video!: HTMLVideoElement
}
