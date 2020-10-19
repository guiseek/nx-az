import { FireAuthModule } from '@nx-fire/auth'
/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { AuthLoginComponent } from './auth-login.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent
  let fixture: ComponentFixture<AuthLoginComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FireAuthModule, ReactiveFormsModule],
        declarations: [AuthLoginComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
