import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCreupComponent } from './artist-creup.component';

describe('ArtistCreupComponent', () => {
  let component: ArtistCreupComponent;
  let fixture: ComponentFixture<ArtistCreupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistCreupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistCreupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
