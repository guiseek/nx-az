import { IconModule } from './../icon/icon.module'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { CheckComponent } from './check.component'

describe('CheckComponent', () => {
  let component: CheckComponent
  let fixture: ComponentFixture<CheckComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconModule, ReactiveFormsModule],
      declarations: [CheckComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
