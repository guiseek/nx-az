import { HighContrastModeDetector } from '@angular/cdk/a11y'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'nx-az-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
  constructor(private _highContrast: HighContrastModeDetector) {}

  ngOnInit() {
    console.log(this._highContrast.getHighContrastMode())
  }
}
