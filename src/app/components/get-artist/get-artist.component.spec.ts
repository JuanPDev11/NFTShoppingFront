import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetArtistComponent } from './GetArtistComponent';

describe('GetArtistComponent', () => {
  let component: GetArtistComponent;
  let fixture: ComponentFixture<GetArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetArtistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
