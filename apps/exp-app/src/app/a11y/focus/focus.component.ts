import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
  OnDestroy,
  ViewChild,
  OnInit,
  Component,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'nx-az-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.scss']
})
export class FocusComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('monitored') monitoredEl: ElementRef<HTMLElement>;
  @ViewChild('element') element: ElementRef<HTMLElement>;
  @ViewChild('subtree') subtree: ElementRef<HTMLElement>;

  elementOrigin = this.formatOrigin(null);
  subtreeOrigin = this.formatOrigin(null);

  origin = this.formatOrigin(null);

  constructor(
    public focusMonitor: FocusMonitor,
    private _cdr: ChangeDetectorRef,
    private _ngZone: NgZone
  ) {}

  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : 'blurred';
  }

  elementOriginChange($event: FocusOrigin) {
    this.elementOrigin = this.formatOrigin($event);
    this.markForCheck();
  }

  subtreeOriginChange($event: FocusOrigin) {
    this.subtreeOrigin = this.formatOrigin($event);
    this.markForCheck();
  }

  // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
  markForCheck() {
    this._ngZone.run(() => this._cdr.markForCheck());
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.monitoredEl).subscribe((origin) =>
      this._ngZone.run(() => {
        this.origin = this.formatOrigin(origin);
        this._cdr.markForCheck();
      })
    );

    this.focusMonitor.monitor(this.element).subscribe((origin) =>
      this._ngZone.run(() => {
        this.elementOrigin = this.formatOrigin(origin);
        this._cdr.markForCheck();
      })
    );

    this.focusMonitor.monitor(this.subtree, true).subscribe((origin) =>
      this._ngZone.run(() => {
        this.subtreeOrigin = this.formatOrigin(origin);
        this._cdr.markForCheck();
      })
    );
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.monitoredEl);
  }
}
