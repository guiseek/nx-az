import { A11yFormsModule } from '@nx-a11y/forms'
import { A11yFocusModule } from '@nx-a11y/focus'
/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { FormsComponent } from './forms.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('FormsComponent', () => {
  let component: FormsComponent
  let fixture: ComponentFixture<FormsComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [A11yFocusModule, A11yFormsModule, ReactiveFormsModule],
        declarations: [FormsComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
