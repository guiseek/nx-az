import { Component, Input } from '@angular/core'

@Component({
  selector: 'nx-download-button',
  template: `
    <a mat-icon-button [href]="video?.currentSrc" [download]="title">
      <mat-icon>file_download</mat-icon>
    </a>
  `,
  styles: [
    `
      a {
        color: inherit;
        text-decoration: none;
      }
    `,
  ],
})
export class DownloadButtonComponent {
  @Input() video!: HTMLVideoElement
  @Input() title!: string
}
