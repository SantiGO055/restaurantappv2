import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AltaDuenioPage } from './alta-duenio.page';

describe('AltaDuenioPage', () => {
  let component: AltaDuenioPage;
  let fixture: ComponentFixture<AltaDuenioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaDuenioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AltaDuenioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
