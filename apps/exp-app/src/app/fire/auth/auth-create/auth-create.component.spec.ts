import { FireAuthModule } from '@nx-fire/auth'
/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { AuthCreateComponent } from './auth-create.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('AuthCreateComponent', () => {
  let component: AuthCreateComponent
  let fixture: ComponentFixture<AuthCreateComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FireAuthModule, ReactiveFormsModule],
        declarations: [AuthCreateComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCreateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
