import { ControlValueAccessor as NgControlValueAccessor } from '@angular/forms'
import { ValidationErrors, FormArray as NgFormArray } from '@angular/forms'
import { FormControl as NgFormControl } from '@angular/forms'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { FormArray } from './feat-forms-array'
import { FormGroup } from './feat-forms-group'
import {
  of,
  defer,
  merge,
  Subject,
  isObservable,
  Observable,
  Subscription,
} from 'rxjs'
import {
  isNil,
  coerceArray,
  mergeErrors,
  removeError,
} from './feat-forms.utils'
import {
  AbstractControl,
  ControlOptions,
  ControlState,
  ValidatorFn,
  ControlPath,
  ControlFactoryMap,
  AsyncValidator,
  AsyncValidatorFn,
  ControlEventOptions,
  EmitEvent,
  ExtractStrings,
  OnlySelf,
  OrBoxedValue,
  Validator,
  ValidatorOrOpts,
} from './feat-forms.types'

export abstract class ControlValueAccessor<T = any>
  implements NgControlValueAccessor {
  abstract writeValue(value: T): void

  onChange? = (value: T | null) => {}
  onTouched? = () => {}

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}

function getControlValue<T>(control: AbstractControl<T>): T {
  if ((control as any).getRawValue) {
    return (control as any).getRawValue()
  }
  return control.value
}

function compareErrors(a: ValidationErrors | null, b: ValidationErrors | null) {
  if (isNil(a) || isNil(b)) {
    return a === b
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

export function controlValueChanges$<T>(
  control: AbstractControl<T>
): Observable<T> {
  return merge(
    defer(() => of(getControlValue(control))),
    control.valueChanges.pipe(map(() => getControlValue(control)))
  )
}

export function controlDisabled$<T>(
  control: AbstractControl<T>
): Observable<boolean> {
  return merge(
    defer(() => of(control.disabled)),
    control.statusChanges.pipe(
      map(() => control.disabled),
      distinctUntilChanged()
    )
  )
}

export function controlEnabled$<T>(
  control: AbstractControl<T>
): Observable<boolean> {
  return merge(
    defer(() => of(control.enabled)),
    control.statusChanges.pipe(
      map(() => control.enabled),
      distinctUntilChanged()
    )
  )
}

export function controlStatusChanges$<T>(
  control: AbstractControl<T>
): Observable<ControlState> {
  return merge(
    defer(() => of(control.status as ControlState)),
    control.statusChanges.pipe(
      map(() => control.status as ControlState),
      distinctUntilChanged()
    )
  )
}

export function controlErrorChanges$<E>(
  control: AbstractControl,
  errors$: Observable<Partial<E>>
): Observable<E | null> {
  return merge(
    defer(() => of(control.errors as E)),
    errors$ as Observable<E>,
    control.valueChanges.pipe(
      map(() => control.errors as E),
      distinctUntilChanged((a, b) => compareErrors(a, b))
    )
  )
}

export function enableControl<T>(
  control: AbstractControl<T>,
  enabled: boolean,
  opts?: ControlOptions
): void {
  if (enabled) {
    control.enable(opts)
  } else {
    control.disable(opts)
  }
}

export function disableControl<T>(
  control: AbstractControl<T>,
  disabled: boolean,
  opts?: ControlOptions
): void {
  enableControl(control, !disabled, opts)
}

export function controlDisabledWhile<T>(
  control: AbstractControl<T>,
  observable: Observable<boolean>,
  opts?: ControlOptions
): Subscription {
  return observable.subscribe((isDisabled) =>
    disableControl(control, isDisabled, opts)
  )
}

export function controlEnabledWhile<T>(
  control: AbstractControl<T>,
  observable: Observable<boolean>,
  opts?: ControlOptions
): Subscription {
  return observable.subscribe((isEnabled) =>
    enableControl(control, isEnabled, opts)
  )
}

export function mergeControlValidators<T, Control extends AbstractControl<T>>(
  control: Control,
  validators: ValidatorFn<T> | ValidatorFn<T>[]
): void {
  control.setValidators([
    control.validator as ValidatorFn,
    ...coerceArray(validators),
  ])
  control.updateValueAndValidity()
}

export function validateControlOn<T>(
  control: AbstractControl<T>,
  validation: Observable<null | object>
): Subscription {
  return validation.subscribe((maybeError) => {
    control.setErrors(maybeError)
  })
}

export function hasErrorAndTouched<T>(
  control: AbstractControl<T>,
  error: string,
  path?: ControlPath
): boolean {
  const hasError = control.hasError(
    error,
    !path || path.length === 0 ? undefined : path
  )
  return hasError && control.touched
}

export function hasErrorAndDirty<T>(
  control: AbstractControl<T>,
  error: string,
  path?: ControlPath
): boolean {
  const hasError = control.hasError(
    error,
    !path || path.length === 0 ? undefined : path
  )
  return hasError && control.dirty
}

export function markAllDirty<T>(control: FormArray<T> | FormGroup<T>): void {
  control.markAsDirty({ onlySelf: true })
  ;(control as any)._forEachChild((c: { markAllAsDirty: () => any }) =>
    c.markAllAsDirty()
  )
}

export function selectControlValue$<T, R>(
  control: FormGroup<T> | FormArray<T> | FormControl<T>,
  mapFn: (state: T | T[]) => R
): Observable<R> {
  return (control.value$ as Observable<any>).pipe(
    map(mapFn),
    distinctUntilChanged()
  )
}

// export function persistValue$<T>(
//   control: FormGroup<T>,
//   key: string,
//   options: PersistOptions<T>
// ): Observable<T> {
//   return control.valueChanges.pipe(
//     debounceTime(options.debounceTime as number),
//     switchMap((value) => {
//       if (options.manager) {
//         return wrapIntoObservable(options.manager.setValue(key, value))
//       } else {
//         return EMPTY
//       }
//     })
//   )
// }

export function handleFormArrays<T>(
  control: AbstractControl<T>,
  formValue: T,
  arrControlFactory: ControlFactoryMap<T>
) {
  Object.keys(formValue).forEach((controlName) => {
    const value = formValue[controlName as keyof T]
    if (
      Array.isArray(value) &&
      control.get(controlName) instanceof NgFormArray
    ) {
      if (
        !arrControlFactory ||
        (arrControlFactory && !(controlName in arrControlFactory))
      ) {
        throw new Error(`Please provide arrControlFactory for ${controlName}`)
      }
      const current = control.get(controlName) as NgFormArray
      const fc = arrControlFactory[controlName as keyof ControlFactoryMap<T>]
      clearFormArray(current)
      value.forEach((v, i) => current.insert(i, (fc as any)(v)))
    }
  })
}

export function clearFormArray(control: NgFormArray) {
  while (control.length !== 0) {
    control.removeAt(0)
  }
}

export class FormControl<
  T = any,
  E extends object = any
> extends NgFormControl {
  readonly value!: T
  readonly errors!: E | null
  readonly valueChanges!: Observable<T>
  readonly status!: ControlState
  readonly statusChanges!: Observable<ControlState>

  private touchChanges = new Subject<boolean>()
  private dirtyChanges = new Subject<boolean>()
  private errorsSubject = new Subject<Partial<E>>()

  readonly touch$ = this.touchChanges
    .asObservable()
    .pipe(distinctUntilChanged())
  readonly dirty$ = this.dirtyChanges
    .asObservable()
    .pipe(distinctUntilChanged())

  readonly value$ = controlValueChanges$<T>(this)
  readonly disabled$ = controlDisabled$<T>(this)
  readonly enabled$ = controlEnabled$<T>(this)
  readonly status$ = controlStatusChanges$<T>(this)
  readonly errors$ = controlErrorChanges$<E>(
    this,
    this.errorsSubject.asObservable()
  )

  get asyncValidator(): AsyncValidatorFn<T> | null {
    return super.asyncValidator
  }
  set asyncValidator(asyncValidator: AsyncValidatorFn<T> | null) {
    super.asyncValidator = asyncValidator
  }

  get validator(): ValidatorFn<T> | null {
    return super.validator
  }
  set validator(validator: ValidatorFn<T> | null) {
    super.validator = validator
  }

  constructor(
    formState?: OrBoxedValue<T>,
    validatorOrOpts?: ValidatorOrOpts,
    asyncValidator?: AsyncValidator
  ) {
    super(formState, validatorOrOpts, asyncValidator)
  }

  setValue(
    valueOrObservable: Observable<T>,
    options?: ControlOptions
  ): Subscription
  setValue(valueOrObservable: T, options?: ControlOptions): void
  setValue(
    valueOrObservable: any,
    options?: ControlOptions
  ): Subscription | void {
    if (isObservable(valueOrObservable)) {
      return valueOrObservable.subscribe((value) =>
        super.setValue(value, options)
      )
    }

    super.setValue(valueOrObservable, options)
  }

  patchValue(
    valueOrObservable: Observable<T>,
    options?: ControlOptions
  ): Subscription
  patchValue(valueOrObservable: T, options?: ControlOptions): void
  patchValue(
    valueOrObservable: any,
    options?: ControlOptions
  ): Subscription | void {
    if (isObservable(valueOrObservable)) {
      return valueOrObservable.subscribe((value) =>
        super.patchValue(value, options)
      )
    }

    super.patchValue(valueOrObservable, options)
  }

  disabledWhile(observable: Observable<boolean>, options?: ControlOptions) {
    return controlDisabledWhile(this, observable, options)
  }

  enabledWhile(observable: Observable<boolean>, options?: ControlOptions) {
    return controlEnabledWhile(this, observable, options)
  }

  mergeValidators(validators: Validator) {
    mergeControlValidators(this, validators)
  }

  mergeAsyncValidators(validators: AsyncValidator) {
    this.setAsyncValidators([
      this.asyncValidator,
      ...coerceArray(validators),
    ] as AsyncValidator)
    this.updateValueAndValidity()
  }

  markAsTouched(opts?: OnlySelf): void {
    super.markAsTouched(opts)
    this.touchChanges.next(true)
  }

  markAsUntouched(opts?: OnlySelf): void {
    super.markAsUntouched(opts)
    this.touchChanges.next(false)
  }

  markAsPristine(opts?: OnlySelf): void {
    super.markAsPristine(opts)
    this.dirtyChanges.next(false)
  }

  markAsDirty(opts?: OnlySelf): void {
    super.markAsDirty(opts)
    this.dirtyChanges.next(true)
  }

  markAllAsDirty(): void {
    this.markAsDirty({ onlySelf: true })
  }

  reset(formState?: OrBoxedValue<T>, options?: ControlEventOptions): void {
    super.reset(formState, options)
  }

  setValidators(newValidator: Validator): void {
    super.setValidators(newValidator)
    super.updateValueAndValidity()
  }

  setAsyncValidators(newValidator: AsyncValidator): void {
    super.setAsyncValidators(newValidator)
    super.updateValueAndValidity()
  }

  validateOn(observableValidation: Observable<null | object>) {
    return validateControlOn(this, observableValidation)
  }

  getError<K extends ExtractStrings<E>>(errorCode: K): E[K] | null {
    return super.getError(errorCode) as E[K] | null
  }

  hasError<K extends ExtractStrings<E>>(errorCode: K) {
    return super.hasError(errorCode)
  }

  setErrors(errors: Partial<E> | null, opts: EmitEvent = {}) {
    this.errorsSubject.next(errors as Partial<E>)
    return super.setErrors(errors, opts)
  }

  mergeErrors(errors: Partial<E>, opts: EmitEvent = {}): void {
    this.setErrors(mergeErrors<E>(this.errors as Partial<E>, errors), opts)
  }

  removeError(key: keyof E, opts: EmitEvent = {}): void {
    this.setErrors(removeError<E>(this.errors as E, key), opts)
  }

  hasErrorAndTouched(error: ExtractStrings<E>): boolean {
    return hasErrorAndTouched(this, error)
  }

  hasErrorAndDirty(error: ExtractStrings<E>): boolean {
    return hasErrorAndDirty(this, error)
  }

  setEnable(enable = true, opts?: ControlEventOptions) {
    enableControl(this, enable, opts)
  }

  setDisable(disable = true, opts?: ControlEventOptions) {
    disableControl(this, disable, opts)
  }
}
