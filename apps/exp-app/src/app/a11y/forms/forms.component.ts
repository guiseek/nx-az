import { FocusMonitor } from '@angular/cdk/a11y'
import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ScrollStrategy,
} from '@angular/cdk/overlay'
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatInput } from '@angular/material/input'
import { EMPTY, iif, merge, Observable } from 'rxjs'
import {
  delay,
  filter,
  map,
  mapTo,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'

export interface State {
  flag: string
  name: string
  population: string
}

@Component({
  selector: 'nx-az-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  form = this._fb.group({
    simple: ['', [Validators.required]],
    complex: ['', [Validators.required]],
  })
  control = new FormControl('', [Validators.required])
  streets: string[] = [
    'Champs-Élysées',
    'Lombard Street',
    'Abbey Road',
    'Fifth Avenue',
  ]
  filteredStreets: Observable<string[]>

  isOpen = false

  states: State[] = [
    {
      name: 'Vienna',
      population: '1.897M',
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Vienna.svg/800px-Flag_of_Vienna.svg.png',
    },
    {
      name: 'Salzburg',
      population: '152.367K',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Flag_of_Salzburg_%28state%29.svg/1280px-Flag_of_Salzburg_%28state%29.svg.png',
    },
    {
      name: 'Kiev',
      population: '2.884M',
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Kyiv_Kurovskyi.svg',
    },
    {
      name: 'Novopskov',
      population: '9,891K',
      flag:
        '//upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Flag_of_Novopskovskiy_Raion_in_Luhansk_Oblast.png/100px-Flag_of_Novopskovskiy_Raion_in_Luhansk_Oblast.png',
    },
  ]

  showPanel$: Observable<boolean>
  filteredStates$: Observable<State[]>
  stateCtrl = new FormControl()
  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: -21,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      panelClass: 'no-enogh-space-at-bottom',
    },
  ]

  scrollStrategy: ScrollStrategy

  @ViewChild(MatInput, { read: ElementRef, static: true })
  private inputEl: ElementRef

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay: CdkConnectedOverlay

  private isPanelVisible$: Observable<boolean>
  private isPanelHidden$: Observable<boolean>
  private isOverlayDetached$: Observable<void>

  constructor(
    private _fb: FormBuilder,
    private focusMonitor: FocusMonitor,
    private _render: Renderer2
  ) {}

  ngOnInit() {
    this.isPanelVisible$ = this.focusMonitor.monitor(this.inputEl).pipe(
      filter((focused) => !!focused),
      mapTo(true)
    )
    this.isOverlayDetached$ = this.isPanelVisible$.pipe(
      delay(0),
      switchMap(() =>
        iif(
          () => !!this.connectedOverlay.overlayRef,
          this.connectedOverlay.overlayRef.detachments(),
          EMPTY
        )
      )
    )
    this.isPanelHidden$ = merge(
      this.isOverlayDetached$,
      this.connectedOverlay.backdropClick
    ).pipe(mapTo(false))

    this.showPanel$ = merge(this.isPanelHidden$, this.isPanelVisible$).pipe(
      tap((showPanel) => {
        console.log('showPanel: ', showPanel)
      })
    )

    this.filteredStates$ = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    )

    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    )
  }
  togglePanel(change: string | null) {
    console.log(change)
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value)
    return this.streets.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    )
  }
  save() {
    console.log('save')
  }

  undo() {
    console.log('undo')
  }

  onFocusChange(changes?) {
    console.log(changes)
  }

  private _filterStates(value: string): State[] {
    const filterValue = value

    return this.states.filter((state) => state.name.indexOf(filterValue) === 0)
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '')
  }
}
