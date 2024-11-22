import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUserPlaylistsComponent } from './sidebar-user-playlists.component';

describe('SidebarUserPlaylistsComponent', () => {
  let component: SidebarUserPlaylistsComponent;
  let fixture: ComponentFixture<SidebarUserPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarUserPlaylistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUserPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
