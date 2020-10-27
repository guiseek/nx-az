import { Component, Input } from '@angular/core'

@Component({
  selector: 'nx-quality-control',
  template: `
    <div *ngIf="video && video.videoHeight" class="quality">
      {{ video.videoHeight }}p
    </div>
  `,
  styles: [
    `
      .quality {
        display: inline-block;
        font-size: 12px;
        padding-left: 12px;
        padding-right: 12px;
      }
    `,
  ],
})
export class QualityControlComponent {
  @Input() video!: HTMLVideoElement
}
