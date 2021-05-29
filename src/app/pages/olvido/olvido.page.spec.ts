import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OlividoPage } from './olvido.page';

describe('OlividoPage', () => {
  let component: OlividoPage;
  let fixture: ComponentFixture<OlividoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlividoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlividoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
