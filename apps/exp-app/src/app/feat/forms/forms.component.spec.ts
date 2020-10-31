/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { FormsComponent } from './forms.component'

describe('FormsComponent', () => {
  let component: FormsComponent
  let fixture: ComponentFixture<FormsComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
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
