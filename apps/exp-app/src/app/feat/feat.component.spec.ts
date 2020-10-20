import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FeatComponent } from './feat.component'

describe('FeatComponent', () => {
  let component: FeatComponent
  let fixture: ComponentFixture<FeatComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
